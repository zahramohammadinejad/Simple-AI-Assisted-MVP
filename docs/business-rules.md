# Phase 1 — Business Rules

## Process

Smart Employee Request Automation — Equipment Request.

## MVP Rules

1. The request must contain a description.
2. The AI classifies the request and extracts the requested equipment when possible.
3. The AI must return a confidence score.
4. A request can be automatically processed only when the request is complete, the request type is supported, and AI confidence is at least 0.85.
5. If required information is missing, the decision is `needs_information`.
6. If AI confidence is below 0.85 or the request is ambiguous, the decision is `human_review`.
7. Business rules remain deterministic; the LLM does not directly override them.
8. Every analyzed request is stored in Supabase for traceability.

## Supported MVP Equipment

- Monitor
- Laptop
- Keyboard
- Mouse

## Example

**Input:**

> I need a second monitor for my new project.

**Expected interpretation:**

- request_type: equipment_request
- extracted_item: monitor
- priority: normal
- decision: auto_process, if required employee information and policy checks are complete

## Out of Scope for Phase 1

- Agent tool use
- OpenWorker
- Make
- n8n
- RAG
- Long-term agent memory
- Telegram or other external channels
- Complex approval chains
