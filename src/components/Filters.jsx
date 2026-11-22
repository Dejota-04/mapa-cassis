import { Download, Search, Star, X } from 'lucide-react'
import { TAGS, TYPES } from '../data/producers.js'

export default function Filters({ filters, setFilters, regions, favoritesCount, resultCount, filtersActive, onClear, onDownload }) {
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }))
  const toggleIn = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }))

  const chip = (active) =>
    `inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition-colors ${
      active ? 'bg-cassis-800 text-white ring-cassis-800' : 'bg-white text-stone-700 ring-stone-300 hover:ring-cassis-400'
    }`

  return (
    <div className="rounded-2xl border border-cassis-900/10 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Buscar produtor, cidade ou departamento</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Buscar produtor ou cidade…"
            className="w-full rounded-xl border border-stone-300 bg-paper/50 py-2.5 pl-10 pr-3 text-base placeholder:text-stone-400 focus:border-cassis-500 focus:bg-white"
          />
        </label>
        <label className="md:w-72">
          <span className="sr-only">Região</span>
          <select
            value={filters.region}
            onChange={(e) => set({ region: e.target.value })}
            className="w-full rounded-xl border border-stone-300 bg-paper/50 px-3 py-2.5 text-base focus:border-cassis-500 focus:bg-white"
          >
            <option value="">Todas as regiões</option>
            {regions.map((r) => (
              <option key={r.region} value={r.region}>
                {r.region} ({r.count})
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-3 min-w-0">
        <legend className="sr-only">Tipo de produtor</legend>
        {/* no celular os tipos rolam de lado, para não empurrar o mapa para baixo */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          {Object.entries(TYPES).map(([key, t]) => {
            const active = filters.types.includes(key)
            return (
              <button key={key} type="button" aria-pressed={active} onClick={() => toggleIn('types', key)} className={chip(active)}>
                <span className="h-2.5 w-2.5 rounded-full ring-1 ring-white/70" style={{ background: t.color }} aria-hidden />
                {t.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {Object.entries(TAGS).map(([key, t]) => {
          const active = filters.tags.includes(key)
          return (
            <button key={key} type="button" aria-pressed={active} title={t.label} onClick={() => toggleIn('tags', key)} className={chip(active)}>
              {t.label}
            </button>
          )
        })}
        <button
          type="button"
          aria-pressed={filters.onlyFavorites}
          onClick={() => set({ onlyFavorites: !filters.onlyFavorites })}
          className={chip(filters.onlyFavorites)}
        >
          <Star className={`h-4 w-4 ${filters.onlyFavorites ? 'fill-amber-300 text-amber-300' : 'text-amber-500'}`} aria-hidden />
          Só favoritos ({favoritesCount})
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-3">
        <p className="text-stone-700" aria-live="polite">
          <strong className="text-cassis-800">{resultCount}</strong> {resultCount === 1 ? 'produtor encontrado' : 'produtores encontrados'}
          {filtersActive && (
            <button type="button" onClick={onClear} className="ml-3 inline-flex items-center gap-1 text-sm font-medium text-cassis-700 underline-offset-2 hover:underline">
              <X className="h-4 w-4" aria-hidden /> Limpar filtros
            </button>
          )}
        </p>
        <button
          type="button"
          onClick={onDownload}
          disabled={resultCount === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-cassis-800 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-cassis-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download className="h-5 w-5" aria-hidden />
          Baixar planilha
        </button>
      </div>
    </div>
  )
}
