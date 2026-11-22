<!-- doc-conferida: 2026-11-21 commit: 4e6db9e -->
# mapa-cassis

> Mapa interativo dos produtores de cassis (crème, liqueur, sirop) na França, feito para o sogro.
> Serve para conhecer as regiões e para prospectar produtores (busca, filtros, favoritos, planilha).

## Estado
- No ar em https://mapa-cassis.vercel.app (Vercel com deploy automático a partir de push na `main`).
- 166 produtores com nome em 49 departamentos e 11 regiões, além de cerca de 257 pequenos produtores
  estimados (sem nome), que aparecem à parte e não entram nos totais nem no mapa.
- Os dados vieram de uma pesquisa inicial. Em 2026-11-21 foram corrigidos região, cidade e duplicatas
  conhecidas, mas não houve conferência um a um. A página pede para confirmar antes de contatar.

## Como funciona
- Página única, React 19 + Vite 7 + Tailwind 3, sem backend.
- Mapa: Leaflet + react-leaflet 5, com tiles do OpenStreetMap (a CARTO passou a exigir chave).
  O pino é um `CircleMarker` na cor do tipo; fica tracejado quando só o departamento é conhecido.
  Pinos da mesma cidade se espalham em espiral (`spread` em `src/lib/producers.js`).
- Mapa ↔ lista: clicar no pino abre o popup, abre a região na lista e rola até o item (tela ≥ 1024px).
  Clicar na lista voa até o pino. A seleção vive no `App` (`{ producer, from }`).
- Filtros: busca sem acento (nome, cidade, departamento, região, observação), região, tipo, selos
  (IGP, Bio, EPV) e "só favoritos". O mapa se enquadra no resultado.
- Favoritos: `localStorage` (`mapa-cassis:favoritos`). Se o storage estiver bloqueado, valem só na sessão.
- Planilha: CSV com `;`, BOM e fórmulas neutralizadas (abre direto no Excel em português), do resultado filtrado.
- A região sai do código do departamento (`src/data/departments.js`), nunca é digitada à mão.

## Estrutura
- `src/data/producers.js`: produtores (`PRODUCERS`), estimativas (`ESTIMATES`), tipos e selos. **É aqui que se edita a lista.**
- `src/data/departments.js`: departamento → nome e região.
- `src/data/coords.js`: coordenadas de cidade e centro de departamento, gerado por `scripts/geocode.mjs`.
- `src/lib/producers.js`: enriquecer, filtrar, agrupar, CSV e links (Google Maps, busca).
- `src/lib/storage.js`: favoritos.
- `src/components/`: `MapView`, `ProducerList`, `Filters`, `ProducerActions`.
- `src/lib/producers.test.js`: integridade dos dados e lógica (Vitest).

## Rodar, testar, publicar
- `npm install`, depois `npm run dev`. Para o preview estático: `npm run build && npx vite preview --port 4200 --host 127.0.0.1`.
- `npm test` (Vitest), `npm run lint`, `npm run build`.
- Produtor novo: adicione em `producers.js`. Se a cidade for nova, rode `npm run geocode`, que consulta o
  Nominatim a 1 req/s e grava em `coords.js`. Ele recusa a cidade se o CEP ou o código ISO não baterem com o
  departamento. O teste falha se faltar coordenada.
- Publicar: push na `main` (remote `github-personal:Dejota-04/mapa-cassis`); a Vercel faz o build sozinha.
