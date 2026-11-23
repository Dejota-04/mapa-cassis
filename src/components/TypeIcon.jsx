import { Award, CupSoda, Factory, FlaskConical, Grape, Handshake, Apple, Truck, Wine } from 'lucide-react'
import { TYPES } from '../data/producers.js'

// Ícone de cada tipo de produtor (a cor vem de TYPES, a mesma do pino).
const ICONS = {
  licorista: Factory,
  destilaria: FlaskConical,
  artesanal: Wine,
  domaine: Grape,
  cooperativa: Handshake,
  cidricultor: Apple,
  ambulante: Truck,
  xarope: CupSoda,
  marca: Award,
}

// variant "badge": ícone num círculo com fundo claro da cor do tipo.
// variant "plain": só o ícone, na cor do tipo (ou na cor herdada, com inherit).
export default function TypeIcon({ type, variant = 'plain', size = 16, inherit = false, className = '' }) {
  const Icon = ICONS[type]
  const color = TYPES[type]?.color
  if (!Icon) return null
  if (variant === 'badge') {
    return (
      <span
        className={`grid shrink-0 place-items-center rounded-full ${className}`}
        style={{ background: `${color}1f`, color, width: size * 1.9, height: size * 1.9 }}
        aria-hidden
      >
        <Icon size={size} strokeWidth={2} />
      </span>
    )
  }
  return <Icon size={size} strokeWidth={2} className={`shrink-0 ${className}`} style={inherit ? undefined : { color }} aria-hidden />
}
