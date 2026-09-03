# System Architecture — AI-Assisted Employee Operations

## 1. Purpose

This project is no longer a simple "employee request + LLM classification" demo. It is a portfolio-grade reference architecture for an AI-assisted business process.

The system transforms an unstructured employee request into a structured, policy-aware and auditable workflow while keeping final business decisions under deterministic rules and human approval where required.

## 2. Core principle

> **AI understands. Policies inform. Rules decide. Automation executes. Humans control sensitive decisions.**

The LLM is decision support, not the authorization layer.

## 3. Target architecture

```text
Employee
   |
   v
Web Frontend
   |
   v
Supabase Auth / JWT
   |
   v
Supabase Edge Function
   |
   +--> Validate input
   |
   +--> Store request
   |
   +--> LLM: extract structured request
   |        |
   |        +--> confidence
   |        +--> missing information
   |        +--> risk indication
   |
   +--> Validate AI output
   |
   +--> Policy retrieval (Phase 4)
   |
   +--> Deterministic business rules
   |
   +--> Decision engine
            |
            +--> NEEDS_INFORMATION
            +--> HUMAN_REVIEW
            +--> AUTO_ROUTE

Decision result
   |
   +--> Human approval (Phase 5)
   |
   +--> Make automation (Phase 6)
   |
   +--> OpenWorker agentic extension (Phase 7)
   |
   +--> Audit log / analytics
```

## 4. Component responsibilities

| Component | Responsibility | Must not do |
|---|---|---|
| Frontend | Collect requests and display status | Enforce authorization by itself |
| Supabase Auth | Identity and JWT | Decide business approval |
| Edge Functions | Secure orchestration and server-side validation | Expose secrets |
| LLM | Understand natural language and produce structured analysis | Grant access or final approval |
| Policy/RAG | Retrieve organizational knowledge | Replace deterministic rules |
| Rule engine | Apply explicit business policy | Interpret arbitrary natural language |
| Decision engine | Combine validated facts and rules | Bypass authorization |
| Human reviewer | Approve sensitive/uncertain cases | Change audit history |
| Make | Execute repeatable workflow actions | Become the business brain |
| OpenWorker | Handle multi-step reasoning/tool use | Bypass rules or RLS |
| Supabase DB | Persist operational data and audit trail | Trust client-supplied identity |

## 5. Decision boundary

The most important architectural boundary is between **AI recommendation** and **system decision**.

Example:

```text
LLM:
  recommendation = auto_route
  confidence = 0.92

Business facts:
  estimated_cost = 2500
  risk = high

Rules:
  cost >= 2000 -> director approval
  high risk -> human review

Final decision:
  HUMAN_REVIEW
```

The LLM cannot override the rule result.

## 6. Security boundary

The browser may contain the public Supabase URL and anonymous client key. It must never contain:

- Gemini/OpenRouter API keys
- Supabase service-role key
- privileged database credentials

Secrets stay server-side.

RLS is the data-access boundary. Edge Functions are the server-side integration boundary.

## 7. Evolution by phase

### Phase 0
Business/process design only.

### Phase 1
Secure core request management.

### Phase 2
LLM-assisted request understanding.

### Phase 3
Deterministic rules and decision engine.

### Phase 4
Policy knowledge base and RAG.

### Phase 5
Human approval workflow.

### Phase 6
Make orchestration.

### Phase 7
OpenWorker agentic extension.

### Phase 8
Reliability and security hardening.

### Phase 9
Process analytics.

### Phase 10
Portfolio packaging.

## 8. Design rule

Do not add a technology merely because it is fashionable. Every AI/automation component must solve a documented business problem and have a measurable purpose.
