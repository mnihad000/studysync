create table if not exists public.groups (
  id text primary key,
  name text not null,
  daily_minutes integer not null check (daily_minutes > 0),
  streak_days integer not null default 0 check (streak_days >= 0),
  today_minutes integer not null default 0 check (today_minutes >= 0),
  members_met integer not null default 0 check (members_met >= 0),
  invite_code text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.group_members (
  group_id text not null references public.groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default timezone('utc', now()),
  primary key (group_id, user_id)
);

create index if not exists idx_group_members_user_id on public.group_members (user_id);
