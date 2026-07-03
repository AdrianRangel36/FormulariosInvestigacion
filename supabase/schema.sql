-- Ejecutar en el SQL editor del proyecto de Supabase.
-- Tabla genérica de respuestas: no se crea una tabla por formulario.
-- form_id hace match con FormDefinition.id (src/data/forms.ts) y
-- answers guarda el objeto AnswersState (src/types/form.ts) tal cual.

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id text not null,
  answers jsonb not null,
  submitted_at timestamptz not null default now()
);

create index if not exists form_submissions_form_id_idx
  on public.form_submissions (form_id);

-- Row Level Security: el público (anon) solo puede insertar, nunca leer.
alter table public.form_submissions enable row level security;

drop policy if exists "Public can submit form responses" on public.form_submissions;

create policy "Public can submit form responses"
  on public.form_submissions
  for insert
  to anon
  with check (
    -- Mantener esta lista sincronizada con los form.id de src/data/forms.ts
    -- cada vez que se agregue un formulario nuevo.
    form_id in ('entrevista_cualitativa')
  );

-- Deliberadamente no hay política de SELECT: con RLS activo y sin política
-- de lectura, todas las lecturas quedan denegadas por defecto para anon.
-- Leer resultados requerirá un rol autenticado (docente/admin) una vez que
-- se agregue Supabase Auth (fuera de alcance por ahora).
