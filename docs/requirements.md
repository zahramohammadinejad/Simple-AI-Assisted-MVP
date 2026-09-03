# Functional & Non-Functional Requirements

## Functional Requirements

### FR-01 Authentication

The system shall require authenticated users to access protected request functionality.

### FR-02 Request Submission

An employee shall be able to submit a natural-language request.

### FR-03 Request Persistence

The system shall persist the original request before or as part of processing so an AI failure cannot lose the request.

### FR-04 AI Understanding

The system shall extract structured request information from natural language.

### FR-05 AI Validation

The system shall validate the AI output against an expected schema and controlled values.

### FR-06 Missing Information

The system shall identify missing information and allow the employee to provide it before the process continues.

### FR-07 Policy Retrieval

The system shall retrieve relevant organizational policy when a decision depends on document-based knowledge.

### FR-08 Rule Evaluation

The system shall apply deterministic business rules after AI extraction and validation.

### FR-09 Decision Separation

The system shall store AI recommendation separately from the final system decision.

### FR-10 Human Review

The system shall route high-risk, sensitive, ambiguous or approval-required requests to authorized human reviewers.

### FR-11 Approval

An authorized reviewer shall be able to approve, reject or request additional information.

### FR-12 Automation

The system shall emit an actionable event for workflow automation after a valid decision.

### FR-13 Auditability

The system shall record important lifecycle and decision events.

### FR-14 Status Tracking

Employees and authorized operational users shall be able to view request status appropriate to their role.

### FR-15 Analytics

The system shall calculate process KPIs such as volume, cycle time, automation rate and human-review rate.

## Security Requirements

- Server-side authentication checks.
- JWT-based identity propagation.
- RLS on user-accessible data.
- Server-side input validation.
- No API secrets in frontend code.
- Prompt injection treated as untrusted input.
- Agent tools explicitly allow-listed.
- Unauthorized users must not access another employee's requests.

## Reliability Requirements

- Persist requests even when LLM calls fail.
- Represent failures with explicit statuses/events.
- Do not treat unvalidated AI output as trusted data.
- Prevent invalid status transitions.
- Avoid duplicate workflow execution where possible.
- Record automation failures for recovery.

## Explainability Requirements

For each important decision, the system should be able to show:

- original request
- AI interpretation
- confidence
- missing information
- relevant policy reference when used
- business rules evaluated
- final decision
- reason
- human decision when applicable

## Portfolio acceptance criteria

A reviewer should be able to understand the business problem, follow the AS-IS and TO-BE processes, inspect the decision logic, reproduce the main test scenarios and see why each AI/automation technology exists.
