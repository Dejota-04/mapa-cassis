import { ExternalLink, MapPinned, Search, Star } from 'lucide-react'
import { mapsUrl, searchUrl } from '../lib/producers.js'

export default function ProducerActions({ p, isFavorite, onToggleFavorite, onShowOnMap, compact = false }) {
  const base = compact
    ? 'inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium'
    : 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium'
  const link = `${base} bg-cassis-50 !text-cassis-800 ring-1 ring-cassis-200 hover:bg-cassis-100 !no-underline`
  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? 'mt-2.5' : 'mt-3'}`}>
      <a className={link} href={mapsUrl(p)} target="_blank" rel="noopener noreferrer">
        <MapPinned className="h-4 w-4" aria-hidden /> Google Maps
        <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
      </a>
      <a className={link} href={searchUrl(p)} target="_blank" rel="noopener noreferrer">
        <Search className="h-4 w-4" aria-hidden /> Pesquisar
        <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
      </a>
      {compact && (
        <button
          type="button"
          onClick={() => onToggleFavorite(p.id)}
          aria-pressed={isFavorite}
          className={`${base} ${isFavorite ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300' : 'bg-stone-100 text-stone-700 ring-1 ring-stone-200'}`}
        >
          <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} aria-hidden />
          {isFavorite ? 'Favorito' : 'Favoritar'}
        </button>
      )}
      {onShowOnMap && p.lat != null && (
        <button type="button" onClick={() => onShowOnMap(p)} className={`${link} lg:hidden`}>
          <MapPinned className="h-4 w-4" aria-hidden /> Ver no mapa
        </button>
      )}
    </div>
  )
}
