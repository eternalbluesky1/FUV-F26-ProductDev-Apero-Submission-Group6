create table public.deals (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brand_name text not null,
  title text not null,
  category text not null
    constraint deals_category_check check (category in ('cinema', 'food', 'software', 'learning')),
  offer_type text not null,
  benefit_label text not null,
  eligibility_kind text not null
    constraint deals_eligibility_kind_check check (
      eligibility_kind in (
        'student_only',
        'age_based',
        'member',
        'referral',
        'general',
        'student_verified_education'
      )
    ),
  eligibility_text text not null,
  source_url text not null,
  destination_url text not null,
  source_type text not null,
  source_checked_at date,
  review_by timestamptz,
  content_status text not null default 'needs_review'
    constraint deals_content_status_check check (
      content_status in ('current_snapshot', 'needs_review', 'expired', 'demo_fixture')
    ),
  relationship_label text not null default 'Không có quan hệ đối tác',
  redemption_steps text,
  cities text[],
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.deals enable row level security;

grant usage on schema public to anon, authenticated;
revoke all on table public.deals from anon, authenticated;
grant select on table public.deals to anon, authenticated;

create policy deals_public_read
  on public.deals
  for select
  to anon, authenticated
  using (
    content_status = 'current_snapshot'
    and source_checked_at is not null
    and review_by is not null
    and review_by > now()
    and (starts_at is null or starts_at <= now())
    and (expires_at is null or expires_at > now())
  );

create table public.deal_clicks (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  created_at timestamptz not null default now(),
  source_surface text not null,
  destination_domain text not null
);

alter table public.deal_clicks enable row level security;

revoke all on table public.deal_clicks from anon, authenticated;

create index deals_public_lookup_idx
  on public.deals (content_status, review_by, starts_at, expires_at);

create index deals_category_idx
  on public.deals (category);

create index deal_clicks_deal_id_created_at_idx
  on public.deal_clicks (deal_id, created_at desc);

create index deal_clicks_created_at_idx
  on public.deal_clicks (created_at desc);
