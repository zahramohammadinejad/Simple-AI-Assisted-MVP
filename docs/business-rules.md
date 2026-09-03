# Business Rules & Decision Matrix

## 1. Purpose

Business rules are deterministic controls applied after the LLM has extracted and the application has validated request information.

The LLM may recommend an outcome, but it cannot override these rules.

## 2. Supported request domains

The first portfolio release supports these example domains:

- Equipment purchase
- Software access
- System access
- Office equipment
- Expense/reimbursement

The architecture is extensible to HR and other internal processes.

## 3. Required information

Every request requires:

- authenticated employee identity
- request description
- request type
- responsible department
- purpose/business reason

Additional fields depend on request type.

### Equipment

- item
- quantity
- specification when applicable
- estimated cost when approval thresholds depend on cost

### Software/System Access

- requested resource
- business purpose
- requested duration when applicable
- sensitivity/risk classification

## 4. Deterministic rules

| ID | Condition | Outcome |
|---|---|---|
| BR-01 | Required information missing | `needs_information` |
| BR-02 | Unsupported request type | `human_review` |
| BR-03 | AI confidence < 0.85 | `human_review` |
| BR-04 | Ambiguous AI extraction | `human_review` |
| BR-05 | High or critical risk | `human_review` |
| BR-06 | Sensitive system/admin access | `human_review` + security review |
| BR-07 | Equipment cost < 500 | eligible for automatic routing if all other rules pass |
| BR-08 | Equipment cost 500–1999.99 | manager approval |
| BR-09 | Equipment cost >= 2000 | director/authorized senior approval |
| BR-10 | Valid low-risk routine request with complete information | `auto_route` |

Thresholds are fictional demonstration values and must be configurable in a real organization.

## 5. Decision precedence

Rules are evaluated in this order:

```text
1. Authentication / authorization
2. Input validation
3. Required information
4. Security-sensitive request checks
5. Risk checks
6. Confidence / ambiguity checks
7. Cost and approval thresholds
8. Routing rules
9. Automatic execution eligibility
```

A higher-priority safety rule overrides an automatic-routing rule.

## 6. Example: low-cost routine request

Input:

> I need a keyboard for work. It costs about $40.

Expected:

```text
Type: equipment
Department: IT
Risk: low
Cost: $40
Confidence: >= 0.85
Required information: complete
Final decision: AUTO_ROUTE
```

## 7. Example: expensive request

Input:

> I need a $2,500 laptop for software development.

Expected:

```text
Type: equipment
Department: IT
Cost: $2,500
Final decision: HUMAN_REVIEW
Approval: senior/authorized approval according to policy
```

## 8. Example: sensitive access

Input:

> I need admin access to the production database.

Expected:

```text
Type: system_access
Risk: high
Security review: required
Final decision: HUMAN_REVIEW
Automatic approval: prohibited
```

## 9. AI vs rules

### AI responsibilities

- Understand natural language
- Extract entities
- Identify likely request type
- Detect potentially missing information
- Produce a risk indication
- Recommend a route
- Summarize the request

### Application responsibilities

- Validate AI output
- Apply business rules
- Enforce authorization
- Determine final workflow state
- Control approvals
- Write audit events

## 10. Policy/RAG boundary

Use deterministic rules for explicit thresholds and mappings.

Use policy retrieval when the answer depends on organizational documents, for example:

> "Does this software require manager approval?"

The retrieved policy must be traceable by policy ID and version.
