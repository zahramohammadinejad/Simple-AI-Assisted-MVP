# Implementation Roadmap

## Status at redesign

The repository already contains a working foundation with a static frontend, Supabase request storage/authentication concepts, RLS and a server-side AI integration boundary. The existing architecture and rules were originally scoped as a small equipment-request MVP. They have now been reframed toward a broader AI-assisted business process platform.

## Implementation sequence

| Phase | Focus | Main outcome |
|---|---|---|
| 0 | Product & Process | Business case, AS-IS, TO-BE, BPMN, requirements |
| 1 | Secure Core | Auth, JWT, RLS, request lifecycle, validation |
| 2 | AI Understanding | Structured extraction, missing information, prompt/version tracking |
| 3 | Decision Engine | Deterministic rules, routing, risk and approval matrix |
| 4 | RAG | Policy knowledge base and traceable retrieval |
| 5 | Human-in-the-loop | Approval queue and reviewer actions |
| 6 | Make | Notifications, tasks and workflow execution |
| 7 | OpenWorker | Multi-step agentic scenarios and authorized tools |
| 8 | Hardening | Security, reliability, failure and abuse testing |
| 9 | Analytics | Process KPIs and bottleneck analysis |
| 10 | Portfolio | Demo, diagrams, evidence and case study |

## Definition of done for each phase

Every phase must have:

1. a business objective;
2. a documented process or requirement;
3. implementation changes;
4. security considerations;
5. test scenarios;
6. evidence/screenshots where useful;
7. documentation;
8. acceptance-criteria verification.

## Do not implement yet

Do not add OpenWorker, RAG or Make simply because they are listed on the roadmap. Add each only when the preceding process demonstrates the business need for it.
