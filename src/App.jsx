import { useCallback, useEffect, useMemo, useState } from 'react'
import { ESTIMATES, PRODUCERS, TYPES } from './data/producers.js'
import * as COORDS from './data/coords.js'
import { NO_LOCATION, enrichProducers, estimatesByRegion, filterProducers, groupByRegion, toCSV } from './lib/producers.js'
import { loadFavorites, saveFavorites } from './lib/storage.js'
import Filters from './components/Filters.jsx'
import MapView from './components/MapView.jsx'
import ProducerList from './components/ProducerList.jsx'

const ALL = enrichProducers(PRODUCERS, COORDS)
const ALL_GROUPS = groupByRegion(ALL)
const ESTIMATES_BY_REGION = estimatesByRegion(ESTIMATES)
const TOTAL_ESTIMATED = ESTIMATES.reduce((s, e) => s + e.approx, 0)
const REGION_COUNT = ALL_GROUPS.filter((g) => g.region !== NO_LOCATION).length
const DEPT_COUNT = new Set(ALL.map((p) => p.dept).filter(Boolean)).size
const EMPTY_FILTERS = { query: '', region: '', types: [], tags: [], onlyFavorites: false }

export default function App() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [selected, setSelected] = useState(null) // { producer, from: 'map' | 'list' }
  const [fitSignal, setFitSignal] = useState(0)
  const [openRegions, setOpenRegions] = useState(() => new Set())

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const filtered = useMemo(() => filterProducers(ALL, { ...filters, favorites }), [filters, favorites])
  const groups = useMemo(() => groupByRegion(filtered), [filtered])
  const filtersActive = JSON.stringify(filters) !== JSON.stringify(EMPTY_FILTERS)

  // Mudou o filtro: se o produtor escolhido não aparece mais, a seleção é limpa
  // (não só escondida), para o popup não voltar quando o filtro for desfeito.
  const updateFilters = useCallback(
    (updater) => {
      const next = typeof updater === 'function' ? updater(filters) : updater
      setFilters(next)
      setSelected((cur) => (cur && filterProducers([cur.producer], { ...next, favorites }).length ? cur : null))
    },
    [filters, favorites],
  )

  // Produtor escolhido que some dos filtros deixa de estar selecionado.
  const visibleSelected = selected && filtered.some((p) => p.id === selected.producer.id) ? selected : null

  const onSelect = useCallback((producer, from) => {
    setSelected(producer ? { producer, from } : null)
    if (producer && from === 'map') setOpenRegions((prev) => (prev.has(producer.region) ? prev : new Set(prev).add(producer.region)))
  }, [])
  const onPopupClose = useCallback((id) => setSelected((cur) => (cur?.producer.id === id ? null : cur)), [])
  const onToggleFavorite = useCallback(
    (id) =>
      setFavorites((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }),
    [],
  )
  const onShowOnMap = useCallback((producer) => {
    setSelected({ producer, from: 'list' })
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const onDownload = () => {
    const blob = new Blob([toCSV(filtered, favorites)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `produtores-cassis-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.append(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-cassis-900 text-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cassis-200 sm:text-sm">Guia de produtores</p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight sm:mt-2 sm:text-5xl">Mapa do Cassis na França</h1>
          <p className="mt-3 max-w-2xl text-base text-cassis-100 sm:text-lg">
            Licoristas, destilarias, domaines e cooperativas que fazem crème, liqueur e sirop de cassis. Toque num ponto do mapa ou
            num nome da lista para ver os detalhes.
          </p>
          <dl className="mt-5 grid grid-cols-4 gap-2 sm:mt-8 sm:gap-3">
            <Stat value={ALL.length} label="produtores com nome" />
            <Stat value={REGION_COUNT} label="regiões" />
            <Stat value={DEPT_COUNT} label="departamentos" />
            <Stat value={`~${TOTAL_ESTIMATED}`} label="pequenos produtores estimados" muted />
          </dl>
        </div>
      </header>

      <main className="mx-auto -mt-5 max-w-7xl px-4 pb-16 sm:px-6">
        <Filters
          filters={filters}
          setFilters={updateFilters}
          regions={ALL_GROUPS.filter((g) => g.region !== NO_LOCATION)}
          favoritesCount={favorites.size}
          resultCount={filtered.length}
          filtersActive={filtersActive}
          onClear={() => updateFilters(EMPTY_FILTERS)}
          onDownload={onDownload}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div id="mapa" className="scroll-mt-4">
            <div className="h-[60vh] min-h-[340px] lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
              <MapView
                producers={filtered}
                selected={visibleSelected}
                onSelect={onSelect}
                onPopupClose={onPopupClose}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                fitSignal={fitSignal}
                onRecenter={() => setFitSignal((n) => n + 1)}
              />
            </div>
          </div>

          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-cassis-300 bg-white p-8 text-center">
                <p className="font-display text-xl font-bold text-cassis-900">Nenhum produtor encontrado</p>
                <p className="mt-2 text-stone-600">
                  {filters.onlyFavorites && favorites.size === 0
                    ? 'Você ainda não marcou favoritos. Toque na estrela ao lado de um produtor para guardar.'
                    : 'Tente outra palavra ou tire algum filtro.'}
                </p>
                <button
                  type="button"
                  onClick={() => updateFilters(EMPTY_FILTERS)}
                  className="mt-4 rounded-xl bg-cassis-800 px-4 py-2.5 font-medium text-white hover:bg-cassis-700"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <ProducerList
                groups={groups}
                estimates={ESTIMATES_BY_REGION}
                filtersActive={filtersActive}
                openRegions={openRegions}
                setOpenRegions={setOpenRegions}
                selected={visibleSelected}
                onSelect={onSelect}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                onShowOnMap={onShowOnMap}
              />
            )}
          </div>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cassis-900/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-cassis-900">Legenda</h2>
            <ul className="mt-4 grid gap-2.5 text-stone-700 sm:grid-cols-2">
              {Object.values(TYPES).map((t) => (
                <li key={t.label} className="flex items-center gap-2.5">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: t.color }} aria-hidden />
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-600">
              <strong>IGP</strong>: produz o crème de cassis com a Indicação Geográfica Protegida “Cassis de Dijon”.{' '}
              <strong>EPV</strong>: selo Entreprise du Patrimoine Vivant. <strong>Bio</strong>: produção orgânica.
            </p>
          </div>

          <div className="rounded-2xl border border-cassis-900/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-cassis-900">Contexto do setor</h2>
            <ul className="mt-4 space-y-2 text-stone-700">
              <li><strong>Cassis de Dijon (IGP):</strong> a maior parte do crème de cassis francês sai da Côte-d’Or.</li>
              <li><strong>Languedoc-Roussillon:</strong> 691 caves e destilarias catalogadas, com cerca de 65 destilarias cooperativas (19 na lista).</li>
              <li><strong>Normandia:</strong> mais de 350 produtores de sidra, muitos com liqueur de cassis au Calvados.</li>
              <li><strong>Cooperativas na França:</strong> cerca de 670 caves coopératives (2014).</li>
              <li><strong>Destiladores ambulantes:</strong> entre 50 e 100 em atividade, estimados.</li>
            </ul>
          </div>
        </section>

        <aside className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-stone-700">
          <h2 className="font-display text-lg font-bold text-amber-900">Sobre os dados</h2>
          <p className="mt-2">
            Os totais contam só os produtores com nome na lista. As estimativas de pequenos produtores (cerca de {TOTAL_ESTIMATED}) aparecem à
            parte em cada região, porque muitos trabalham só localmente e sem presença na internet. Antes de entrar em contato, confirme
            endereço e telefone pelo botão <em>Google Maps</em> ou <em>Pesquisar</em> de cada produtor.
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Os favoritos ficam salvos só neste aparelho e navegador. Para levar a lista para outro lugar, use <em>Baixar planilha</em>.
          </p>
        </aside>
      </main>
    </div>
  )
}

function Stat({ value, label, muted = false }) {
  return (
    <div className={`flex flex-col-reverse justify-end rounded-xl px-2.5 py-2 sm:px-4 sm:py-3 ${muted ? 'bg-white/5 ring-1 ring-white/15' : 'bg-white/10'}`}>
      <dt className="text-xs leading-tight text-cassis-100 sm:text-sm">{label}</dt>
      <dd className="font-display text-xl font-bold sm:text-3xl">{value}</dd>
    </div>
  )
}
