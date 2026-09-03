# create-request Edge Function

This directory documents the server-side request entry point used by the project.

## Responsibility

The function is the secure boundary between the frontend and protected backend operations. It should:

1. Verify the authenticated Supabase JWT.
2. Derive employee identity from the authenticated user, not from trusted client input.
3. Validate request input and maximum length.
4. Persist the original request.
5. Call the configured LLM provider server-side.
6. Validate the structured AI response.
7. Store AI analysis and prompt/model metadata.
8. Apply deterministic business rules.
9. Set the next workflow state/decision.
10. Record important audit/workflow events.

## AI boundary

The LLM is responsible for natural-language understanding and recommendation only. It must never directly grant authorization, approve sensitive requests or bypass application business rules.

## Failure behavior

If the LLM is unavailable, times out, exceeds a rate limit or returns invalid structured data:

- keep the original request;
- record an explicit analysis failure;
- do not silently approve or discard the request;
- allow retry or human review according to the process design.

## Security

- Never put Gemini/OpenRouter API keys in frontend code.
- Never put the Supabase service-role key in frontend code or this repository.
- Keep RLS enabled.
- Validate JWTs server-side.
- Validate input server-side.
- Treat request text as untrusted data and protect against prompt injection.
- Do not trust client-supplied employee IDs for authorization.

## Future extensions

The function may later coordinate policy retrieval, decision evaluation and event emission to Make. OpenWorker should access approved tools through explicit server-side boundaries rather than bypassing Supabase authorization.

The executable function source may remain deployed in Supabase; this repository document intentionally contains no secrets.
