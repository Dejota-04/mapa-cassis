import { useEffect } from 'react'
import { ChevronDown, MapPinOff, Star, Users } from 'lucide-react'
import { TAGS, TYPES } from '../data/producers.js'
import ProducerActions from './ProducerActions.jsx'
import TypeIcon from './TypeIcon.jsx'

export default function ProducerList({ groups, estimates, filtersActive, openRegions: open, setOpenRegions: setOpen, selected, onSelect, favorites, onToggleFavorite, onShowOnMap }) {
  const selectedId = selected?.producer.id

  // Escolheu no mapa (o App já abriu a região): rola a lista até ele, só em
  // tela larga, onde mapa e lista ficam lado a lado.
  useEffect(() => {
    if (!selected || selected.from !== 'map') return
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    requestAnimationFrame(() => {
      document.getElementById(`produtor-${selectedId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [selected, selectedId])

  const allOpen = filtersActive || groups.every((g) => open.has(g.region))
  const toggle = (region) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(region)) next.delete(region)
      else next.add(region)
      return next
    })

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-cassis-900">Por região</h2>
        {!filtersActive && (
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(groups.map((g) => g.region)))}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-cassis-700 hover:bg-cassis-50"
          >
            {allOpen ? 'Fechar todas' : 'Abrir todas'}
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {groups.map((g) => {
          const isOpen = filtersActive || open.has(g.region)
          const est = estimates[g.region]?.reduce((s, e) => s + e.approx, 0) ?? 0
          const panelId = `regiao-${g.region.replace(/\W+/g, '-')}`
          return (
            <li key={g.region} className="overflow-hidden rounded-xl border border-cassis-900/10 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => toggle(g.region)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={filtersActive}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-cassis-50/60 disabled:cursor-default disabled:hover:bg-transparent"
              >
                <span>
                  <span className="block font-display text-lg font-bold text-cassis-900">{g.region}</span>
                  <span className="text-sm text-stone-600">
                    {g.count} {g.count === 1 ? 'produtor' : 'produtores'}
                    {est > 0 && !filtersActive && <span className="text-stone-500"> · ~{est} estimados sem nome</span>}
                  </span>
                </span>
                {!filtersActive && (
                  <ChevronDown className={`h-5 w-5 shrink-0 text-cassis-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                )}
              </button>

              {isOpen && (
                <div id={panelId} className="border-t border-cassis-900/10 px-2 pb-3 pt-1 sm:px-3">
                  {g.depts.map((d) => (
                    <section key={d.code ?? 'none'} className="mt-2">
                      <h3 className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
                        {d.code ? `${d.name} (${d.code})` : 'Distribuição nacional'}
                      </h3>
                      <ul>
                        {d.producers.map((p) => (
                          <ProducerItem
                            key={p.id}
                            p={p}
                            isSelected={p.id === selectedId}
                            isFavorite={favorites.has(p.id)}
                            onSelect={onSelect}
                            onToggleFavorite={onToggleFavorite}
                            onShowOnMap={onShowOnMap}
                          />
                        ))}
                      </ul>
                    </section>
                  ))}
                  {!filtersActive &&
                    estimates[g.region]?.map((e) => (
                      <p key={e.label} className="flex items-start gap-2 mx-2 mt-2 rounded-lg bg-leaf/10 px-3 py-2 text-sm text-leaf">
                        <Users className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                        <span>
                          Estimativa: ~{e.approx} {e.label} ({e.place})
                        </span>
                      </p>
                    ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ProducerItem({ p, isSelected, isFavorite, onSelect, onToggleFavorite, onShowOnMap }) {
  const type = TYPES[p.type]
  return (
    <li
      id={`produtor-${p.id}`}
      className={`rounded-lg transition-colors ${isSelected ? 'bg-cassis-50 ring-1 ring-cassis-300' : 'hover:bg-stone-50'}`}
    >
      <div className="flex items-start gap-1">
        <button
          type="button"
          onClick={() => onSelect(isSelected ? null : p, 'list')}
          aria-expanded={isSelected}
          className="flex min-w-0 flex-1 items-start gap-3 rounded-lg px-2 py-2.5 text-left"
        >
          <span title={type.label} className="mt-0.5">
            <TypeIcon type={p.type} variant="badge" size={15} />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold leading-snug text-stone-900">{p.name}</span>
            <span className="block text-sm text-stone-600">
              {p.city ?? <span className="italic">cidade não informada</span>}
              {p.founded ? ` · desde ${p.founded}` : ''}
              {p.lat == null && (
                <span className="ml-1 inline-flex items-center gap-0.5 text-stone-500">
                  · <MapPinOff className="h-3.5 w-3.5" aria-hidden /> fora do mapa
                </span>
              )}
            </span>
            {(p.tags.length > 0 || p.note) && (
              <span className="mt-1 flex flex-wrap items-center gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} title={TAGS[t].label} className="rounded bg-leaf/10 px-1.5 py-0.5 text-xs font-semibold text-leaf">
                    {TAGS[t].short}
                  </span>
                ))}
                {p.note && <span className="text-sm text-stone-500">{p.note}</span>}
              </span>
            )}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onToggleFavorite(p.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Tirar ${p.name} dos favoritos` : `Favoritar ${p.name}`}
          title={isFavorite ? 'Tirar dos favoritos' : 'Favoritar'}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-stone-400 hover:bg-amber-50 hover:text-amber-500"
        >
          <Star className={`h-5 w-5 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} aria-hidden />
        </button>
      </div>
      {isSelected && (
        <div className="px-3 pb-3 sm:pl-12">
          <p className="text-sm text-stone-600">
            {type.label}
            {p.deptName ? ` · ${p.deptName} (${p.dept})` : ''}
            {p.approx ? ' · no mapa, pino no centro do departamento' : ''}
          </p>
          <ProducerActions p={p} onShowOnMap={onShowOnMap} />
        </div>
      )}
    </li>
  )
}
