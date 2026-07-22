# KuLVI – Kuopion LVI-yhdistys ry

Modernit nettisivut Kuopion LVI-yhdistykselle (Vite + React).

## Kehitys

```bash
npm install
npm run dev
```

## Tuotanto

```bash
npm run build
npm run preview
```

Staattiset tiedostot syntyvät kansioon `dist/`.

### Hosting

- **Netlify**: `public/_redirects` hoitaa SPA-reitityksen
- **Vercel**: `vercel.json` hoitaa rewrite-säännöt
- **GitHub Pages**: `404.html` ohjaa polut takaisin sovellukseen

## Sivut

| Polku | Sisältö |
|-------|---------|
| `/` | Etusivu |
| `/jasenyys` | Jäsenyys, maksut, liittymisohje |
| `/kirjaudu` | Supabase-kirjautuminen |
| `/jasensivu` | Jäsenalue (vaatii kirjautumisen) |
| `/hallituksen-sivu` | Hallituksen aineistot (rooli: hallitus) |
| `/hallitus` | Julkinen hallituslistaus |
| `/tapahtumat` | Kokoukset |
| `/yhteystiedot` | Yhteystiedot + lomake |
| `/tietosuoja` | Tietosuojaseloste |

## Supabase + demotunnukset

Tämä projekti on **Vite + React** (ei Next.js). Älä käytä `@supabase/ssr` / middleware -ohjetta sellaisenaan — selainasiakas riittää (`@supabase/supabase-js`).

1. Kopioi `.env.example` → `.env` ja täytä:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` (tai `VITE_SUPABASE_ANON_KEY`)
2. Aja SQL: [`supabase/schema.sql`](supabase/schema.sql)
3. Luo demokäyttäjät: [`supabase/DEMO.md`](supabase/DEMO.md)

Demotunnukset:

- Jäsen: `jasen@kulvi.demo` / `KulviJasen2026!`
- Hallitus: `hallitus@kulvi.demo` / `KulviHallitus2026!`

