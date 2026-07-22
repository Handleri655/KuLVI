# Supabase-asennus + demotunnukset

## 1. Luo projekti
1. Mene [supabase.com](https://supabase.com) → New project
2. Project Settings → API:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` `public` key → `VITE_SUPABASE_ANON_KEY`
3. Kopioi `.env.example` → `.env` ja täytä arvot

## 2. Aja skeema
SQL Editor → liitä ja aja `supabase/schema.sql`

## 3. Authentication-asetukset
Authentication → Providers → Email:
- Enable Email provider
- **Disable** “Confirm email” demoa varten (tai vahvista käyttäjät manuaalisesti)

## 4. Luo demotunnukset
Authentication → Users → Add user (tai Invite):

| Sähköposti | Salasana | Rooli |
|---|---|---|
| `jasen@kulvi.demo` | `KulviJasen2026!` | jäsen |
| `hallitus@kulvi.demo` | `KulviHallitus2026!` | hallitus |

User metadata (Create user → Auto Confirm):
- Jäsen: `{ "role": "jasen", "full_name": "Demo Jäsen" }`
- Hallitus: `{ "role": "hallitus", "full_name": "Demo Hallitus" }`

Jos profiilia ei synny triggerillä, aja:

```sql
-- Korvaa UUID Authentication → Users -näkymästä
update public.profiles set role = 'jasen', full_name = 'Demo Jäsen'
where id = '<JASEN_USER_UUID>';

update public.profiles set role = 'hallitus', full_name = 'Demo Hallitus'
where id = '<HALLITUS_USER_UUID>';
```

Tai luo rivit:

```sql
insert into public.profiles (id, role, full_name)
values
  ('<JASEN_USER_UUID>', 'jasen', 'Demo Jäsen'),
  ('<HALLITUS_USER_UUID>', 'hallitus', 'Demo Hallitus')
on conflict (id) do update
set role = excluded.role, full_name = excluded.full_name;
```

## 5. Käynnistä sovellus
```bash
npm run dev
```

Kirjaudu: `/kirjaudu`

- Jäsen → `/jasensivu` (jäsenaineistot)
- Hallitus → `/jasensivu` + `/hallituksen-sivu` (pöytäkirjat ym.)

## GDPR-huomio
Demotunnukset ovat vain kehitykseen. Tuotannossa:
- omat henkilökohtaiset tunnukset
- vahvat salasanat / MFA
- pöytäkirjat vain private Storage + RLS
- säilytysajat ja tietosuojaseloste ajan tasalla
