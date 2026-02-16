---
id: 1
title: Create Phase II Constitution
stage: constitution
date_iso: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: evolution-of-todo
branch: main
user: unknown
command: /sp.phr
labels: ["constitution", "spec-driven-development", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - ".specify/memory/constitution.md"
tests_yaml:
  - none
---

# Prompt Text
```
Create a single global constitution for the "Evolution of Todo" project Phase II Name(Listify).

This constitution must define:

1. Spec-Driven Development is mandatory
   - No code may be written without approved specifications and tasks
   - All work must follow: Constitution → Specifications → Plan → Tasks → Implementation

2. Agent Behavior Rules
   - No manual coding by humans
   - No feature invention outside approved specs
   - Refinement must occur at spec level, not code level

3. Phase Governance
   - Each phase must remain strictly scoped
   - Phase II features must not leak into Phase I or future phases
   - Architecture can evolve only through updated specifications and plans

4. Technology Constraints
   - Python for backend
   - Next.js for frontend
   - FastAPI, SQLModel, Neon DB for persistence
   - JWT-based authentication
   - Cloud-native readiness

5. Quality Principles
   - Modular, maintainable, and testable code
   - Clear separation of concerns between frontend and backend
   - Stateless services where required
   - Secure data handling

This constitution acts as the supreme governing document for all agents in Phase II.
Use the skills that you have aas per need OK!
```

# Response Text
Created a comprehensive constitution for the Evolution of Todo Phase II (Listify) project that defines the required principles and governance structure.

# Outcome Impact
Established a governing constitution that enforces Spec-Driven Development methodology and defines clear technology stack and quality standards for the project.

# Tests Summary
none

# Files Summary
- .specify/memory/constitution.md

# Next Prompts
none

# Reflection Note
The constitution establishes clear governance for the project with emphasis on spec-driven development and proper separation of concerns between frontend and backend.

# Evaluation
**Failure modes observed:** None

**Next experiment to improve prompt quality:** N/A