// Geocodifica as cidades e os departamentos usados em src/data/producers.js
// via Nominatim (OpenStreetMap) e grava src/data/coords.js.
// Só busca o que ainda não está em coords.js. Respeita 1 requisição/segundo.
//
//   npm run geocode
//
// Cidade cujo CEP não bate com o departamento é recusada e listada no fim:
// corrija o nome da cidade em producers.js e rode de novo.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PRODUCERS } from '../src/data/producers.js'
import { DEPARTMENTS } from '../src/data/departments.js'
import { CITY_COORDS, DEPT_COORDS } from '../src/data/coords.js'

const OUT = fileURLToPath(new URL('../src/data/coords.js', import.meta.url))
const UA = 'mapa-cassis-geocoder/1.0'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const round = (n) => Math.round(Number(n) * 10000) / 10000

async function search(params) {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  for (const [k, v] of Object.entries({ format: 'jsonv2', addressdetails: 1, countrycodes: 'fr', limit: 5, ...params })) {
    url.searchParams.set(k, v)
  }
  await sleep(1100)
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'fr' } })
  if (!res.ok) throw new Error(`Nominatim ${res.status}`)
  return res.json()
}

const cities = { ...CITY_COORDS }
const depts = { ...DEPT_COORDS }
const failed = []

const wantedCities = new Map()
for (const p of PRODUCERS) {
  if (p.city && p.dept) wantedCities.set(`${p.city}|${p.dept}`, p)
}
const wantedDepts = new Set(PRODUCERS.map((p) => p.dept).filter(Boolean))

try {
for (const code of wantedDepts) {
  if (depts[code]) continue
  const d = DEPARTMENTS[code]
  // Departamento no OSM é addresstype "county"; aceita só esse, da região certa.
  const hits = await search({ q: d.name })
  const hit = hits.find((h) => h.addresstype === 'county' && h.display_name.includes(d.region))
  if (hit) {
    depts[code] = [round(hit.lat), round(hit.lon)]
    console.log(`dept ${code} ${d.name} → ${depts[code]}`)
  } else failed.push(`departamento ${code}`)
}

for (const [key, p] of wantedCities) {
  if (cities[key]) continue
  const hits = await search({ q: `${p.city}, ${DEPARTMENTS[p.dept].name}` })
  // Cidade grande não traz CEP único; o código ISO do departamento resolve.
  const hit = hits.find(
    (h) =>
      h.address?.['ISO3166-2-lvl6'] === `FR-${p.dept}` ||
      (h.address?.postcode ?? '').startsWith(p.dept.replace(/^2[AB]$/, '20')),
  )
  if (hit) {
    cities[key] = [round(hit.lat), round(hit.lon)]
    console.log(`${key} → ${cities[key]}`)
  } else {
    failed.push(`${key} (${hits.map((h) => h.address?.postcode).join(', ') || 'sem resultado'})`)
  }
}
} catch (err) {
  // 403/429/rede: para na hora (não adianta seguir batendo) e grava o que já veio.
  failed.unshift(`INTERROMPIDO: ${err.message}`)
}

const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(
  OUT,
  `// Gerado por scripts/geocode.mjs (Nominatim/OpenStreetMap). Pode editar à mão.\n` +
    `// chave "Cidade|dept" → [lat, lng]\n` +
    `export const CITY_COORDS = ${JSON.stringify(sorted(cities), null, 2)}\n\n` +
    `// centro aproximado do departamento → [lat, lng]\n` +
    `export const DEPT_COORDS = ${JSON.stringify(sorted(depts), null, 2)}\n`,
)

console.log(`\n${Object.keys(cities).length} cidades, ${Object.keys(depts).length} departamentos.`)
if (failed.length) {
  console.log(`\nNão encontrados (${failed.length}):\n  ${failed.join('\n  ')}`)
  process.exitCode = 1
}
