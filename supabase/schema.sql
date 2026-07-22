-- KuLVI Supabase schema: profiles, documents, RLS
-- Aja tämä Supabase SQL Editorissa.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('jasen', 'hallitus')),
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  audience text not null check (audience in ('jasen', 'hallitus')),
  storage_path text,
  published_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.documents enable row level security;

-- Profiili: käyttäjä näkee vain oman rivinsä
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Dokumentit: jäsen näkee jäsenaineistot; hallitus näkee kaikki
drop policy if exists "documents_select_by_role" on public.documents;
create policy "documents_select_by_role"
  on public.documents for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and (
          p.role = 'hallitus'
          or (p.role = 'jasen' and documents.audience = 'jasen')
        )
    )
  );

-- Automaattinen profiili (oletus: jasen) — demotunnuksille päivitetään rooli käsin
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'jasen'),
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Demoaineistot (ei tiedostoja — metadata)
insert into public.documents (title, description, audience, storage_path)
select * from (values
  (
    'Jäsentiedote kevät 2026',
    'Yhteenveto kevään toiminnasta ja tulevista kokouksista.',
    'jasen',
    null
  ),
  (
    'Kuukausikokouskutsu (malli)',
    'Esimerkkikutsu jäsenille. Korvaa oikealla PDF:llä Storageen.',
    'jasen',
    null
  ),
  (
    'Hallituksen pöytäkirja (malli) 2/2026',
    'Vain hallitukselle. Lisää oikea PDF Storage-bucketiin hallitus-docs.',
    'hallitus',
    null
  ),
  (
    'Talouden seurantaraportti (malli)',
    'Sisäinen raportti hallitukselle.',
    'hallitus',
    null
  )
) as v(title, description, audience, storage_path)
where not exists (select 1 from public.documents limit 1);

-- Storage (valinnainen): private bucket hallitus-/jäsenaineistoille
insert into storage.buckets (id, name, public)
values ('kulvi-docs', 'kulvi-docs', false)
on conflict (id) do nothing;

drop policy if exists "kulvi_docs_read" on storage.objects;
create policy "kulvi_docs_read"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'kulvi-docs'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and (
          p.role = 'hallitus'
          or (p.role = 'jasen' and (storage.foldername(name))[1] = 'jasen')
        )
    )
  );
