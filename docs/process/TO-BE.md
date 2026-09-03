# TO-BE Process

## Future-state scenario

```text
Employee
   ↓
Secure Request Portal
   ↓
Authentication / Authorization
   ↓
Store Request
   ↓
LLM Understanding
   ↓
Validate AI Output
   ↓
Missing Information?
   ├── Yes → Employee provides information → Re-analysis
   └── No
        ↓
Policy Retrieval when required
        ↓
Deterministic Business Rules
        ↓
Risk + Approval Evaluation
        ↓
Decision
   ├── AUTO_ROUTE → Make → Department Task → Notification
   ├── HUMAN_REVIEW → Approver → Approve/Reject/More Information
   └── NEEDS_INFORMATION → Employee → Re-submit information
        ↓
Execution
   ↓
Audit Log
   ↓
Analytics
```

## Key process improvements

| Problem | TO-BE improvement |
|---|---|
| Unstructured requests | Natural-language intake + structured extraction |
| Manual routing | Rule-based routing supported by AI understanding |
| Missing information | Automated detection and clarification loop |
| Manual policy lookup | Policy retrieval/RAG where appropriate |
| Inconsistent decisions | Deterministic decision matrix |
| Sensitive decisions | Human-in-the-loop approval |
| Manual notifications | Make automation |
| Fragmented history | Central audit trail |
| Low visibility | Request timeline and KPI dashboard |

## Design principle

The process deliberately separates understanding, decision and execution:

**LLM understands → policies inform → rules decide → humans control sensitive decisions → automation executes.**
