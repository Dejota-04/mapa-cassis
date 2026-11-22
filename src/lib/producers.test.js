import { describe, expect, it } from 'vitest'
import { PRODUCERS, ESTIMATES, TYPES, TAGS } from '../data/producers.js'
import { DEPARTMENTS } from '../data/departments.js'
import * as COORDS from '../data/coords.js'
import {
  NO_LOCATION,
  csvCell,
  enrichProducers,
  estimatesByRegion,
  filterProducers,
  groupByRegion,
  normalize,
  toCSV,
} from './producers.js'
import { loadFavorites, saveFavorites } from './storage.js'

const ITEMS = enrichProducers(PRODUCERS, COORDS)
// França metropolitana, com folga
const inFrance = (p) => p.lat > 41 && p.lat < 51.5 && p.lng > -5.5 && p.lng < 10

describe('dados', () => {
  it('todo produtor tem tipo, departamento e selos válidos', () => {
    for (const p of PRODUCERS) {
      expect(TYPES[p.type], `${p.name}: tipo ${p.type}`).toBeDefined()
      if (p.dept !== null) expect(DEPARTMENTS[p.dept], `${p.name}: dept ${p.dept}`).toBeDefined()
      for (const t of p.tags ?? []) expect(TAGS[t], `${p.name}: selo ${t}`).toBeDefined()
      if (p.city) expect(p.dept, `${p.name}: cidade sem departamento`).not.toBeNull()
    }
  })

  it('não tem produtor duplicado', () => {
    const names = PRODUCERS.map((p) => normalize(p.name))
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([])
    const ids = ITEMS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('toda cidade e departamento usados têm coordenada dentro da França', () => {
    for (const p of PRODUCERS) {
      if (p.city) expect(COORDS.CITY_COORDS[`${p.city}|${p.dept}`], `${p.city}|${p.dept}: rode npm run geocode`).toBeDefined()
      if (p.dept) expect(COORDS.DEPT_COORDS[p.dept], `dept ${p.dept}: rode npm run geocode`).toBeDefined()
    }
    for (const p of ITEMS.filter((x) => x.lat != null)) expect(inFrance(p), p.name).toBe(true)
  })

  it('estimativas: departamentos válidos, todos da mesma região, número positivo', () => {
    for (const e of ESTIMATES) {
      expect(e.depts.length, e.label).toBeGreaterThan(0)
      for (const d of e.depts) expect(DEPARTMENTS[d], `${e.label}: ${d}`).toBeDefined()
      expect(new Set(e.depts.map((d) => DEPARTMENTS[d].region)).size, e.label).toBe(1)
      expect(e.approx).toBeGreaterThan(0)
    }
  })

  it('a região sai do departamento (corrige o Lot e o Gers, que são Occitanie)', () => {
    const byName = Object.fromEntries(ITEMS.map((p) => [p.name, p]))
    expect(byName['Distillerie Louis Roque'].region).toBe('Occitanie')
    expect(byName['Distillerie Aurian'].region).toBe('Occitanie')
    expect(byName['Monin'].region).toBe('Centre-Val de Loire')
    expect(byName['Distillerie Persyn'].region).toBe('Hauts-de-France')
  })
})

describe('enrichProducers', () => {
  const coords = { CITY_COORDS: { 'Dijon|21': [47.32, 5.04] }, DEPT_COORDS: { '21': [47.46, 4.75], '89': [47.85, 3.64] } }

  it('usa a cidade, cai no centro do departamento ou fica sem pino', () => {
    const [city, dept, none] = enrichProducers(
      [
        { name: 'A', city: 'Dijon', dept: '21', type: 'licorista' },
        { name: 'B', city: null, dept: '89', type: 'domaine' },
        { name: 'C', city: null, dept: null, type: 'marca' },
      ],
      coords,
    )
    expect(city).toMatchObject({ lat: 47.32, lng: 5.04, approx: false, region: 'Bourgogne-Franche-Comté', deptName: "Côte-d'Or" })
    expect(dept).toMatchObject({ lat: 47.85, lng: 3.64, approx: true })
    expect(none).toMatchObject({ lat: null, lng: null, approx: false, region: NO_LOCATION, tags: [] })
  })

  it('espalha os pinos da mesma cidade sem afastar demais', () => {
    const list = enrichProducers(
      Array.from({ length: 7 }, (_, i) => ({ name: `P${i}`, city: 'Dijon', dept: '21', type: 'licorista' })),
      coords,
    )
    const points = new Set(list.map((p) => `${p.lat},${p.lng}`))
    expect(points.size).toBe(7)
    for (const p of list) {
      expect(Math.abs(p.lat - 47.32)).toBeLessThan(0.05)
      expect(Math.abs(p.lng - 5.04)).toBeLessThan(0.05)
    }
  })

  it('gera id único mesmo com nomes iguais', () => {
    const ids = enrichProducers(
      [
        { name: 'Cave X', city: null, dept: null, type: 'cooperativa' },
        { name: 'Cave X', city: null, dept: null, type: 'cooperativa' },
      ],
      coords,
    ).map((p) => p.id)
    expect(ids).toEqual(['cave-x', 'cave-x-2'])
  })
})

describe('filterProducers', () => {
  it('busca sem acento, por várias palavras e por cidade', () => {
    expect(filterProducers(ITEMS, { query: 'heritier' }).map((p) => p.name)).toEqual(["L'Héritier-Guyot"])
    expect(filterProducers(ITEMS, { query: 'nuits domaine' }).every((p) => p.city === 'Nuits-Saint-Georges')).toBe(true)
    expect(filterProducers(ITEMS, { query: 'FOUGEROLLES' })).toHaveLength(2)
  })

  it('combina região, tipo, selo e favoritos', () => {
    const igpBfc = filterProducers(ITEMS, { region: 'Bourgogne-Franche-Comté', tags: ['igp'] })
    expect(igpBfc.length).toBeGreaterThan(0)
    expect(igpBfc.every((p) => p.tags.includes('igp') && p.region === 'Bourgogne-Franche-Comté')).toBe(true)

    const coops = filterProducers(ITEMS, { types: ['cooperativa', 'ambulante'] })
    expect(coops.every((p) => ['cooperativa', 'ambulante'].includes(p.type))).toBe(true)

    const favorites = new Set(['monin', 'giffard', 'nao-existe'])
    expect(filterProducers(ITEMS, { onlyFavorites: true, favorites }).map((p) => p.id).sort()).toEqual(['giffard', 'monin'])
  })

  it('devolve vazio quando nada bate, sem quebrar', () => {
    expect(filterProducers(ITEMS, { query: 'zzzz' })).toEqual([])
    expect(filterProducers(ITEMS, { onlyFavorites: true })).toEqual([])
    expect(filterProducers([], { query: 'x' })).toEqual([])
  })
})

describe('groupByRegion e estimativas', () => {
  it('agrupa tudo, em ordem, com "sem localização" por último', () => {
    const groups = groupByRegion(ITEMS)
    expect(groups.reduce((s, g) => s + g.count, 0)).toBe(ITEMS.length)
    expect(groups.at(-1).region).toBe(NO_LOCATION)
    const names = groups.slice(0, -1).map((g) => g.region)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, 'fr')))
  })

  it('estimativas por região', () => {
    const est = estimatesByRegion(ESTIMATES)
    expect(est['Grand Est'].map((e) => e.place)).toContain('Moselle, Meurthe-et-Moselle, Meuse e Vosges')
    expect(est['Bourgogne-Franche-Comté'][0].place).toBe("Côte-d'Or")
    expect(est.Normandie).toBeUndefined()
  })
})

describe('CSV', () => {
  it('escapa aspas, separador e quebra de linha', () => {
    expect(csvCell('Dopff & Irion')).toBe('Dopff & Irion')
    expect(csvCell('A; B')).toBe('"A; B"')
    expect(csvCell('diz "oi"')).toBe('"diz ""oi"""')
    expect(csvCell('linha\noutra')).toBe('"linha\noutra"')
    expect(csvCell(null)).toBe('')
    expect(csvCell(1841)).toBe('1841')
  })

  it('neutraliza fórmula', () => {
    expect(csvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`)
    expect(csvCell('+33')).toBe("'+33")
    expect(csvCell('@cmd')).toBe("'@cmd")
  })

  it('tem BOM, cabeçalho e uma linha por produtor, com acentos', () => {
    const list = filterProducers(ITEMS, { query: 'lejay' })
    const csv = toCSV(list, new Set([list[0].id]))
    expect(csv.startsWith('﻿Nome;Tipo;')).toBe(true)
    const lines = csv.split('\r\n')
    expect(lines).toHaveLength(2)
    expect(lines[1]).toContain('Lejay-Lagoute;Licoristas tradicionais;Dijon;Côte-d\'Or;21;Bourgogne-Franche-Comté;1841;IGP;')
    expect(lines[1]).toContain(';sim;cidade;https://www.google.com/maps/')
  })
})

describe('favoritos no localStorage', () => {
  const memory = () => {
    const data = {}
    return { getItem: (k) => data[k] ?? null, setItem: (k, v) => (data[k] = v) }
  }

  it('salva e carrega', () => {
    const s = memory()
    expect(saveFavorites(new Set(['a', 'b']), s)).toBe(true)
    expect([...loadFavorites(s)]).toEqual(['a', 'b'])
  })

  it('não quebra com storage bloqueado, ausente ou corrompido', () => {
    const blocked = { getItem: () => { throw new Error('SecurityError') }, setItem: () => { throw new Error('QuotaExceeded') } }
    expect(loadFavorites(blocked).size).toBe(0)
    expect(saveFavorites(new Set(['a']), blocked)).toBe(false)
    expect(loadFavorites(undefined).size).toBe(0)
    expect(loadFavorites({ getItem: () => '{oops' }).size).toBe(0)
    expect([...loadFavorites({ getItem: () => '["a", 3, null]' })]).toEqual(['a'])
  })
})
