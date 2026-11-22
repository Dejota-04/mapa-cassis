// localStorage pode não existir ou lançar erro (aba anônima, cookies
// bloqueados). Nesses casos os favoritos valem só enquanto a página estiver aberta.

const KEY = 'mapa-cassis:favoritos'

export function loadFavorites(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(list) ? list.filter((x) => typeof x === 'string') : [])
  } catch {
    return new Set()
  }
}

export function saveFavorites(favorites, storage = globalThis.localStorage) {
  try {
    storage?.setItem(KEY, JSON.stringify([...favorites]))
    return true
  } catch {
    return false
  }
}
