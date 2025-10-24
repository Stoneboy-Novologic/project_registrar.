# Editor Flow

```mermaid
flowchart LR
  A[User edits form] --> B[Zustand store update]
  B --> C[Autosave to localStorage]
  B --> D[Overlay components consume values]
  D --> E[Live Preview updates]
  E -->|/export/html| F[Printable HTML]
  F -->|/api/export/pdf| G[PDF (stub)]
```
