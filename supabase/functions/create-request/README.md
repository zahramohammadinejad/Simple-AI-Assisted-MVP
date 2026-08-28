# create-request Edge Function

This directory documents the deployed Supabase Edge Function used by Phase 1.

The function requires a valid Supabase JWT and validates the request before writing to `public.requests`.

Security rules:
- Never put Gemini API keys in frontend code.
- Never put the Supabase service-role key in frontend code or this repository.
- Keep RLS enabled on `public.requests`.
- The deployed function uses JWT verification.
- Validate input length and type before database writes.

The executable function source is deployed in Supabase. This repository file is documentation only and intentionally contains no secrets.
