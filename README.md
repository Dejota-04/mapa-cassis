# Mapa do Cassis na França

Mapa interativo dos produtores de cassis na França: licoristas, destilarias, domaines, cooperativas e
fabricantes de xarope, com busca, filtros, favoritos e exportação para planilha.

**No ar:** https://mapa-cassis.vercel.app

```bash
npm install
npm run dev        # desenvolvimento
npm test           # testes (dados e lógica)
npm run geocode    # coordenadas de cidades novas (OpenStreetMap/Nominatim)
```

A lista de produtores fica em `src/data/producers.js`. Detalhes em `docs/ARQUITETURA.md`.
