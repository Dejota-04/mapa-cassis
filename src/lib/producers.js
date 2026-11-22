import { DEPARTMENTS } from '../data/departments.js'
import { TYPES, TAGS } from '../data/producers.js'

export const NO_LOCATION = 'Sem localização conhecida'

export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export function slugify(text) {
  return normalize(text).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Afasta pinos que caem no mesmo ponto (vários produtores na mesma cidade)
// numa espiral, para que todos fiquem clicáveis ao dar zoom.
function spread(items) {
  const byPoint = new Map()
  for (const p of items) {
    if (p.lat == null) continue
    const key = `${p.lat},${p.lng}`
    if (!byPoint.has(key)) byPoint.set(key, [])
    byPoint.get(key).push(p)
  }
  for (const group of byPoint.values()) {
    if (group.length < 2) continue
    group.forEach((p, i) => {
      const angle = i * 2.39996 // ângulo de ouro, em radianos
      const r = 0.006 * Math.sqrt(i + 1)
      p.lat = p.lat + r * Math.cos(angle)
      p.lng = p.lng + (r * Math.sin(angle)) / Math.cos((p.lat * Math.PI) / 180)
    })
  }
  return items
}

// Junta produtor + departamento + coordenadas. Sem cidade conhecida, usa o
// centro do departamento e marca approx; sem departamento, fica sem pino.
export function enrichProducers(producers, { CITY_COORDS, DEPT_COORDS }) {
  const seen = new Map()
  const items = producers.map((p) => {
    let id = slugify(p.name)
    const n = (seen.get(id) ?? 0) + 1
    seen.set(id, n)
    if (n > 1) id = `${id}-${n}`

    const dept = p.dept ? DEPARTMENTS[p.dept] : null
    const city = p.city && p.dept ? CITY_COORDS[`${p.city}|${p.dept}`] : null
    const center = p.dept ? DEPT_COORDS[p.dept] : null
    const point = city ?? center ?? null

    return {
      ...p,
      id,
      tags: p.tags ?? [],
      deptName: dept?.name ?? null,
      region: dept?.region ?? NO_LOCATION,
      lat: point ? point[0] : null,
      lng: point ? point[1] : null,
      approx: !city && Boolean(center),
    }
  })
  return spread(items)
}

export function filterProducers(items, { query = '', region = '', types = [], tags = [], onlyFavorites = false, favorites = new Set() } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  return items.filter((p) => {
    if (region && p.region !== region) return false
    if (types.length && !types.includes(p.type)) return false
    if (tags.length && !tags.every((t) => p.tags.includes(t))) return false
    if (onlyFavorites && !favorites.has(p.id)) return false
    if (terms.length) {
      const hay = normalize([p.name, p.city, p.deptName, p.dept, p.region, p.note, TYPES[p.type]?.label].join(' '))
      if (!terms.every((t) => hay.includes(t))) return false
    }
    return true
  })
}

// [{ region, count, depts: [{ code, name, producers }] }], regiões em ordem
// alfabética e "sem localização" por último.
export function groupByRegion(items) {
  const regions = new Map()
  for (const p of items) {
    if (!regions.has(p.region)) regions.set(p.region, new Map())
    const depts = regions.get(p.region)
    const key = p.dept ?? '—'
    if (!depts.has(key)) depts.set(key, { code: p.dept, name: p.deptName, producers: [] })
    depts.get(key).producers.push(p)
  }
  return [...regions.entries()]
    .map(([region, depts]) => ({
      region,
      count: [...depts.values()].reduce((s, d) => s + d.producers.length, 0),
      depts: [...depts.values()]
        .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '', 'fr'))
        .map((d) => ({ ...d, producers: [...d.producers].sort((a, b) => a.name.localeCompare(b.name, 'fr')) })),
    }))
    .sort((a, b) => {
      if (a.region === NO_LOCATION) return 1
      if (b.region === NO_LOCATION) return -1
      return a.region.localeCompare(b.region, 'fr')
    })
}

export function estimatesByRegion(estimates) {
  const out = {}
  for (const e of estimates) {
    const region = DEPARTMENTS[e.depts[0]]?.region ?? NO_LOCATION
    const names = e.depts.map((d) => DEPARTMENTS[d]?.name ?? d)
    const place = names.length > 1 ? `${names.slice(0, -1).join(', ')} e ${names.at(-1)}` : names[0]
    ;(out[region] ??= []).push({ ...e, place })
  }
  return out
}

export function mapsUrl(p) {
  const q = [p.name, p.city, p.deptName, 'France'].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
}

export function searchUrl(p) {
  const q = [p.name, p.city, 'cassis'].filter(Boolean).join(' ')
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`
}

// Célula de CSV: aspas escapadas e fórmula neutralizada (=, +, -, @ no início
// viram texto no Excel).
export function csvCell(value) {
  let s = value == null ? '' : String(value)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\n\r,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

// CSV separado por ";" (o Excel em português abre direto) com BOM para os acentos.
export function toCSV(items, favorites = new Set()) {
  const header = ['Nome', 'Tipo', 'Cidade', 'Departamento', 'Código', 'Região', 'Fundação', 'Selos', 'Observação', 'Favorito', 'Localização', 'Google Maps']
  const rows = items.map((p) => [
    p.name,
    TYPES[p.type]?.label ?? p.type,
    p.city ?? '',
    p.deptName ?? '',
    p.dept ?? '',
    p.region,
    p.founded ?? '',
    p.tags.map((t) => TAGS[t]?.short ?? t).join(', '),
    p.note ?? '',
    favorites.has(p.id) ? 'sim' : '',
    p.lat == null ? 'sem localização' : p.approx ? 'aproximada (departamento)' : 'cidade',
    mapsUrl(p),
  ])
  return '﻿' + [header, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n')
}
