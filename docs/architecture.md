# Phase 1 — Architecture

## Goal

Build a small AI-assisted employee equipment request MVP without an automation platform or agent runtime.

## Architecture

```text
Employee
   |
   v
GitHub Pages — Static Web UI
   |
   | HTTPS
   v
Supabase
   +-- Auth
   +-- PostgreSQL / requests
   +-- Edge Function: analyze-request
              |
              | server-side API call
              v
          Gemini API
```

## Responsibilities

- GitHub: source code, version control and portfolio visibility.
- GitHub Pages: hosts the static frontend.
- Supabase Auth: identifies the signed-in employee.
- Supabase PostgreSQL: stores request data and AI analysis.
- Supabase RLS: restricts users to their own request rows.
- Supabase Edge Function: keeps the Gemini API key out of browser code and coordinates the AI request.
- Gemini: classifies/extracts information from the employee request.

## Security boundary

The browser may contain public Supabase client configuration, but must never contain the Gemini API key or Supabase service-role key.

Private secrets belong on the server side, in the Supabase Edge Function environment.

## Future phases

- Phase 2: add OpenWorker as the Agent runtime.
- Phase 3: add Make as workflow orchestration.
- Phase 4: replace Make with self-hosted n8n for a client-deployable architecture.
