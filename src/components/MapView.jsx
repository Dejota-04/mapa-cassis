import { useEffect, useMemo } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { Crosshair } from 'lucide-react'
import { TYPES } from '../data/producers.js'
import ProducerActions from './ProducerActions.jsx'

const FRANCE = [
  [42.3, -4.8],
  [51.1, 8.2],
]

// Enquadra os pinos visíveis sempre que o resultado dos filtros muda
// (ou quando o usuário pede para recentralizar).
function FitToResults({ points, signal }) {
  const map = useMap()
  const key = points.map((p) => p.id).join(',')
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) {
      map.flyTo([points[0].lat, points[0].lng], 11, { duration: 0.6 })
      return
    }
    const bounds = points.map((p) => [p.lat, p.lng])
    map.flyToBounds(bounds, { padding: [30, 30], maxZoom: 11, duration: 0.6 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, signal, map])
  return null
}

// Voa até o produtor escolhido na lista.
function FlyToSelected({ selected }) {
  const map = useMap()
  useEffect(() => {
    if (!selected || selected.from !== 'list' || selected.producer.lat == null) return
    const { lat, lng } = selected.producer
    map.flyTo([lat, lng], Math.max(map.getZoom(), 10), { duration: 0.6 })
  }, [selected, map])
  return null
}

export default function MapView({ producers, selected, onSelect, onPopupClose, favorites, onToggleFavorite, fitSignal, onRecenter }) {
  const points = useMemo(() => producers.filter((p) => p.lat != null), [producers])
  const selectedId = selected?.producer.id
  const selLat = selected?.producer.lat
  const selLng = selected?.producer.lng
  // Array estável: o Popup do react-leaflet reabre (e puxa o mapa) se a posição mudar de identidade.
  const popupPosition = useMemo(() => (selLat == null ? null : [selLat, selLng]), [selLat, selLng])

  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-2xl border border-cassis-900/10 shadow-sm">
      <MapContainer bounds={FRANCE} scrollWheelZoom className="h-full w-full" attributionControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <FitToResults points={points} signal={fitSignal} />
        <FlyToSelected selected={selected} />

        {points.map((p) => {
          const isSelected = p.id === selectedId
          const isFavorite = favorites.has(p.id)
          return (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={isSelected ? 12 : 8}
              pathOptions={{
                color: isFavorite ? '#d97706' : '#ffffff',
                weight: isFavorite || isSelected ? 3 : 1.5,
                fillColor: TYPES[p.type].color,
                fillOpacity: p.approx ? 0.5 : 0.9,
                dashArray: p.approx ? '3 3' : null,
              }}
              eventHandlers={{ click: () => onSelect(p, 'map') }}
            >
              {!isSelected && (
                <Tooltip direction="top" offset={[0, -6]}>
                  {p.name}
                </Tooltip>
              )}
            </CircleMarker>
          )
        })}

        {selected && popupPosition && (
          <Popup
            key={selectedId}
            position={popupPosition}
            offset={[0, -6]}
            // Fechou o popup (X, Esc, clique no mapa): o App só limpa a seleção
            // se ela ainda for este produtor, e não um novo escolhido agora.
            eventHandlers={{ remove: () => onPopupClose(selected.producer.id) }}
          >
            <PopupBody p={selected.producer} isFavorite={favorites.has(selectedId)} onToggleFavorite={onToggleFavorite} />
          </Popup>
        )}
      </MapContainer>

      <button
        type="button"
        onClick={onRecenter}
        className="absolute right-3 top-3 z-[1000] flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-cassis-800 shadow ring-1 ring-black/10 hover:bg-white"
      >
        <Crosshair className="h-4 w-4" aria-hidden />
        Enquadrar
      </button>

      {points.length === 0 && (
        <div className="pointer-events-none absolute inset-0 z-[1000] grid place-items-center">
          <p className="rounded-xl bg-white/95 px-5 py-3 text-center text-stone-700 shadow">
            Nenhum produtor no mapa com esses filtros.
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-6 left-3 z-[1000] hidden items-center gap-2 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs text-stone-600 shadow sm:flex">
        <svg width="14" height="14" aria-hidden>
          <circle cx="7" cy="7" r="5.5" fill="#9c3f70" fillOpacity="0.5" stroke="#9c3f70" strokeDasharray="2 2" />
        </svg>
        Pino tracejado: só o departamento é conhecido
      </div>
    </div>
  )
}

function PopupBody({ p, isFavorite, onToggleFavorite }) {
  const type = TYPES[p.type]
  return (
    <div className="min-w-[210px] max-w-[260px]">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide" style={{ color: type.color }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: type.color }} aria-hidden />
        {type.label}
      </p>
      <h3 className="mt-1 font-display text-lg font-bold leading-tight text-cassis-900">{p.name}</h3>
      <p className="mt-1 text-stone-600">
        {p.city ? `${p.city} · ` : ''}
        {p.deptName} ({p.dept})
        {p.founded ? ` · desde ${p.founded}` : ''}
      </p>
      {p.approx && <p className="mt-1 text-xs text-amber-700">Cidade não informada: pino no centro do departamento.</p>}
      {p.note && <p className="mt-1 text-stone-700">{p.note}</p>}
      <ProducerActions p={p} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} compact />
    </div>
  )
}
