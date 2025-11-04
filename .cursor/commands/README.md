# BharatAI Command System — Developer Manual

## Vision
This repository uses **Cursor AI Commands** as autonomous operational units to build, maintain, and optimize enterprise-grade full-stack applications.

Each command represents a deterministic phase in the software life cycle — from discovery → planning → implementation → validation → release.

---

## Command Philosophy
- **Atomic:** each command has a single, clear outcome.  
- **Composable:** commands can call or chain each other safely.  
- **Document-Driven:** `.doc.md` metadata guides AI context, reducing file reads.  
- **Safe-Write:** all modifications are validated and logged.  

---

## Command Groups

| Group | Commands | Description |
|-------|-----------|-------------|
| **Project Intelligence** | `scan-project`, `generate-docs`, `validate-docs` | Index + documentation baseline. |
| **Planning & Architecture** | `analyze-architecture`, `plan-module` | Macro + micro design. |
| **Implementation & Enhancement** | `implement-feature`, `optimize-structure` | Build & refactor. |
| **Quality & Testing** | `generate-tests`, `validate-tests` | Coverage & validation. |
| **Performance & Cleanup** | `remove-dead-code`, `optimize-performance` | Health maintenance. |
| **Deployment & Maintenance** | `prepare-release` | Pre-release validation. |

---

## Folder Structure

.cursor/
└─ commands/
├─ scan-project.md
├─ generate-docs.md
├─ validate-docs.md
├─ analyze-architecture.md
├─ plan-module.md
├─ implement-feature.md
├─ optimize-structure.md
├─ generate-tests.md
├─ validate-tests.md
├─ remove-dead-code.md
├─ optimize-performance.md
├─ prepare-release.md
├─ full-cycle.md
└─ README.md ← (this file)



---

## Execution Rules
1. Run commands via Cursor command palette or terminal-style prompt.  
2. Use short invocations like `/scan-project`.  
3. Always run `/scan-project` first to update the project map.  
4. Before release, chain `/validate-docs`, `/validate-tests`, `/prepare-release`.  
5. AI must never push production code directly — human confirmation required.

---

## Logging & Artifacts
All temporary data lives under:

.cursor/cache/

Artifacts (plans, reports, releases) live under:

/docs/


---

## Maintenance Flow
For any feature or bug cycle:

/scan-project → /generate-docs → /plan-module → /implement-feature
→ /generate-tests → /validate-tests → /optimize-structure → /prepare-release


---

## Security & Ethics
- No API keys or secrets stored in Markdown.  
- Code modification only within declared scope.  
- All destructive commands (e.g., remove-dead-code) are quarantine-only.  
