# AI-Assisted Employee Operations

A portfolio-grade reference implementation of an AI-assisted business process for internal employee requests.

> **AI understands. Policies inform. Rules decide. Automation executes. Humans control sensitive decisions.**

## Why this project exists

Traditional employee requests are often unstructured and manually routed. Missing information, policy lookup, approval handling and follow-up create avoidable operational work.

This project redesigns that process as a secure, auditable workflow:

```text
Natural-language request
        ↓
AI understanding
        ↓
Structured + validated data
        ↓
Missing-information check
        ↓
Policy retrieval when needed
        ↓
Deterministic business rules
        ↓
Decision
   ┌────┼──────────────┐
   ↓    ↓              ↓
Auto  Need info    Human review
route     ↓             ↓
   └──────┴─────────────┘
             ↓
       Workflow automation
             ↓
          Audit trail
             ↓
          Analytics
```

## Portfolio value

The project demonstrates:

- Business Analysis and process redesign
- AS-IS / TO-BE process modeling
- Business rules and decision matrices
- LLM-based natural-language understanding
- Human-in-the-loop controls
- RAG for organizational policy when justified
- Make workflow automation
- OpenWorker agentic extension for multi-step cases
- Supabase Auth, JWT and RLS
- Error handling and auditability
- Process KPIs

It is intentionally **not** positioned as a simple chatbot or request classifier.

## Current repository structure

```text
.
├── README.md
├── docs/
│   ├── architecture.md
│   ├── business-rules.md
│   ├── project-specification.md
│   ├── requirements.md
│   ├── roadmap.md
│   └── process/
│       ├── AS-IS.md
│       └── TO-BE.md
├── database/
│   └── schema.sql
├── frontend/
├── supabase/
│   └── functions/
└── index.html
```

## Phases

0. Product & Process Definition
1. Secure Core MVP
2. AI Understanding
3. Business Rules & Decision Engine
4. Policy Knowledge Base / RAG
5. Human-in-the-Loop
6. Make Automation
7. OpenWorker Agentic Extension
8. Reliability & Security Hardening
9. Process Analytics
10. Portfolio Packaging

See [`docs/roadmap.md`](docs/roadmap.md) for the implementation sequence.

## Example business scenario

> I need a $2,500 laptop for software development because my current machine is not powerful enough.

The LLM identifies the request as equipment-related, but the application—not the LLM—applies the cost/approval rule. Because the amount is above the demonstration threshold, the final path is human review.

## Technology roles

| Technology | Role |
|---|---|
| Supabase | Auth, PostgreSQL, RLS, Edge Functions, operational data |
| LLM | Natural-language understanding and recommendations |
| RAG | Organizational policy retrieval |
| Business rules | Deterministic decisions |
| Human review | Sensitive/final approval |
| Make | Workflow execution |
| OpenWorker | Multi-step reasoning and tool use |
| GitHub Pages | Lightweight portfolio/demo hosting |

## Important note

Sample policies and thresholds are fictional demonstration material. They must not be interpreted as policies of a real organization.
