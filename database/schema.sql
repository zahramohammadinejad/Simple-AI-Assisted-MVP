-- Smart Employee Request Automation — Phase 1
-- Supabase / PostgreSQL schema

create extension if not exists pgcrypto;

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  requester_name text not null,
  requester_email text,
  request_description text not null,
  request_type text,
  extracted_item text,
  quantity integer,
  business_reason text,
  priority text check (priority in ('low','normal','high','urgent')) default 'normal',
  ai_confidence numeric(4,3),
  ai_analysis jsonb,
  decision text check (decision in ('auto_process','human_review','needs_information','rejected')),
  status text check (status in ('new','analyzed','pending_information','in_review','approved','rejected','completed')) default 'new',
  assigned_department text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists requests_status_idx on public.requests(status);
create index if not exists requests_created_at_idx on public.requests(created_at desc);
create index if not exists requests_request_type_idx on public.requests(request_type);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_requests_updated_at on public.requests;
create trigger set_requests_updated_at
before update on public.requests
for each row execute function public.set_updated_at();

-- Phase 1 intentionally keeps business rules simple.
-- Future phases can add departments, policies, tasks, audit logs and agent memory.
