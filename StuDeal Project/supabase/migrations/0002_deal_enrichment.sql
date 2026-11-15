alter table public.deals
  drop constraint if exists deals_category_check;

alter table public.deals
  add constraint deals_category_check check (
    category in ('cinema', 'food', 'software', 'learning', 'shopping', 'transport')
  );

alter table public.deals
  add column if not exists brand_slug text,
  add column if not exists value_kind text not null default 'other'
    constraint deals_value_kind_check check (
      value_kind in ('discount', 'free', 'price', 'credit', 'points', 'other')
    ),
  add column if not exists source_last_status integer,
  add column if not exists source_last_checked_at timestamptz;

create index if not exists deals_brand_slug_idx on public.deals (brand_slug);
