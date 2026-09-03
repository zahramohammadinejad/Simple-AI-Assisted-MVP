# AI-Assisted Employee Operations — Project Specification

## Vision

Build a centralized, secure and auditable platform that converts unstructured employee requests into structured, policy-aware business workflows.

## Business problem

Employees often submit requests through email/chat using incomplete natural language. This causes manual routing, missing information, inconsistent policy application, approval delays and weak auditability.

## Core scenario

An employee submits a natural-language request such as:

> I need a 32GB RAM upgrade for my camera because I edit company Instagram videos. My current setup is not enough.

The platform should:

1. authenticate the employee;
2. store the original request;
3. use an LLM to understand and structure the request;
4. validate the AI result;
5. identify missing information;
6. retrieve relevant organizational policy when needed;
7. apply deterministic business rules;
8. determine auto-route vs information request vs human review;
9. allow authorized human approval for sensitive cases;
10. use Make to execute repeatable workflow actions;
11. maintain an audit trail;
12. provide process KPIs.

## Technology roles

- **Supabase:** Auth, PostgreSQL, RLS, Edge Functions, audit data and vector storage.
- **LLM:** natural-language understanding and decision support.
- **RAG:** retrieval of organizational policy documents where appropriate.
- **Business rules:** deterministic routing, risk and approval controls.
- **Human-in-the-loop:** final control for sensitive or uncertain cases.
- **Make:** workflow execution and notifications.
- **OpenWorker:** later agentic extension for multi-step reasoning and tool use.
- **GitHub Pages:** portfolio/demo frontend hosting where suitable.

## Phase roadmap

### Phase 0 — Product & Process Definition

Deliver:

- product vision
- problem statement
- business case
- actors
- scope/out of scope
- AS-IS process
- TO-BE process
- BPMN
- user journeys
- requirements
- KPIs

### Phase 1 — Secure Core MVP

Build:

- Supabase Auth
- JWT-protected requests
- profiles/departments foundation
- request lifecycle
- RLS
- server-side validation
- protected employee portal

### Phase 2 — AI Understanding

Build:

- LLM provider integration
- structured JSON extraction
- schema validation
- confidence
- missing-information detection
- prompt versioning
- AI analysis persistence
- failure handling
- prompt-injection-resistant prompt design

### Phase 3 — Business Rules & Decision Engine

Build:

- routing matrix
- risk rules
- confidence threshold
- approval thresholds
- required-field rules
- deterministic decision precedence
- AI recommendation vs final decision separation

### Phase 4 — Policy Knowledge Base / RAG

Build:

- fictional sample policies
- policy metadata/versioning
- chunking
- embeddings
- vector search
- relevant-policy retrieval
- traceable policy references

Do not use RAG for simple deterministic mappings or thresholds.

### Phase 5 — Human-in-the-Loop

Build:

- manager/approver role
- approval queue
- approve/reject/request-information
- comments
- approval history
- escalation

### Phase 6 — Make Automation

Build:

- webhook/event intake
- notifications
- task creation
- department routing
- status updates
- audit events
- automation failure handling

Make executes decisions; it does not own business policy.

### Phase 7 — OpenWorker Agentic Extension

Add an agent only for scenarios where multi-step reasoning/tool use provides clear value.

Example:

> I need Tableau, analytics dashboard access and the campaign folder to prepare the monthly marketing report.

The agent should decompose the request, retrieve relevant policy, identify dependencies/missing information, prepare an action plan and call only authorized tools. Final authorization remains outside the agent.

### Phase 8 — Reliability & Security Hardening

Test:

- unauthorized access
- JWT failures
- RLS violations
- malformed input
- prompt injection
- invalid AI JSON
- LLM timeout/rate limit
- database failure
- missing policy
- duplicate requests
- invalid state transitions
- automation failure
- agent tool misuse

### Phase 9 — Process Analytics

Track:

- request volume
- auto-route rate
- human-review rate
- information-request rate
- average processing time
- approval delay
- AI failure rate
- automation failure rate
- department workload

### Phase 10 — Portfolio Packaging

Document:

- business case
- AS-IS / TO-BE
- BPMN
- requirements
- user stories
- business rules
- decision matrix
- architecture
- security
- AI architecture
- RAG design
- agent design
- automation design
- data model
- test scenarios
- KPIs
- lessons learned

## Core test scenarios

1. Low-cost keyboard request → eligible for auto-route.
2. Laptop request without cost/specification → needs information.
3. $2,500 laptop → human approval.
4. Production database admin access → high risk/security review.
5. Prompt injection text → treated as untrusted data; cannot bypass rules.
6. Multi-resource access request → candidate for agentic decomposition.
7. LLM outage → request remains stored and is recoverable/manual-reviewable.
8. Employee A attempts to read employee B's request → denied by authorization/RLS.

## Portfolio positioning

This project should be presented as:

> An AI-assisted business process automation platform that transforms unstructured employee requests into structured, policy-aware and auditable workflows using LLMs, deterministic business rules, human approval and workflow automation.

It should not be presented merely as an AI chatbot or request classifier.

## Golden rule

Every technology must have a documented business reason:

- LLM → natural-language understanding.
- RAG → policy/document retrieval.
- Rules → deterministic decisions.
- Automation → repeatable execution.
- Agent → multi-step reasoning/tool use.
- Human → sensitive/final decisions.
