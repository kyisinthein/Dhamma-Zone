-- Create sutta_pali table
create table if not exists public.sutta_pali (
  id uuid primary key default gen_random_uuid(),
  sutta_id text unique not null,
  sutta_title text not null,
  sutta_subtitle text,
  text text,
  text_link text,
  image_link text,
  fb_link text,
  utube_link text
);

alter table public.sutta_pali enable row level security;

create policy "Enable read access for all users" on public.sutta_pali
  for select using (true);

-- Create sutta_english table
create table if not exists public.sutta_english (
  id uuid primary key default gen_random_uuid(),
  sutta_id text unique not null,
  sutta_title text not null,
  sutta_subtitle text,
  text text,
  text_link text,
  image_link text,
  fb_link text,
  utube_link text
);

alter table public.sutta_english enable row level security;

create policy "Enable read access for all users" on public.sutta_english
  for select using (true);

-- Create sutta_chinese table
create table if not exists public.sutta_chinese (
  id uuid primary key default gen_random_uuid(),
  sutta_id text unique not null,
  sutta_title text not null,
  sutta_subtitle text,
  text text,
  text_link text,
  image_link text,
  fb_link text,
  utube_link text
);

alter table public.sutta_chinese enable row level security;

create policy "Enable read access for all users" on public.sutta_chinese
  for select using (true);
