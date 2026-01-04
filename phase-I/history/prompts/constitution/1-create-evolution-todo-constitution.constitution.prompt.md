---
id: 1
title: Create Evolution Todo Constitution
stage: constitution
date: 2025-12-30
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: master
user:
command: /sp.constitution
labels: [constitution, governance, spec-driven-development]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
  - .specify/templates/tasks-template.md
tests:
  -
---

## Prompt

Create a single global constitution for the entire "Evolution of Todo" project
covering Phase I through Phase V.
This constitution must define:
1. Spec-Driven Development as mandatory
- No agent may write code without approved specs and tasks
- All work must follow: Constitution → Specs → Plan → Tasks → Implement
2. Agent Behavior Rules
- No manual coding by humans
- No feature invention
- No deviation from approved specifications
- Refinement must occur at spec level, not code level

Maryam Arif

3. Phase Governance
- Each phase is strictly scoped by its specification
- Future-phase features must never leak into earlier phases
- Architecture may evolve only through updated specs and plans
4. Technology Constraints
- Python for backend
- Next.js for frontend (later phases)
- FastAPI, SQLModel, Neon DB
- OpenAI Agents SDK, MCP
- Docker, Kubernetes, Kafka, Dapr (later phases)
5. Quality Principles
- Clean architecture
- Stateless services where required
- Clear separation of concerns
- Cloud-native ready

## Response snapshot

Created a comprehensive constitution for the "Evolution of Todo" project that establishes:
1. Core principles including Spec-Driven Development, Agent Behavior Rules, Phase Governance, Technology Constraints, and Quality Principles
2. Technology stack requirements with specific frameworks and tools
3. Development workflow following the Constitution → Specs → Plan → Tasks → Implement lifecycle
4. Governance structure with compliance requirements

Updated template files to ensure alignment with the new constitution:
- Updated plan-template.md to include constitution compliance checks
- Updated spec-template.md to require constitution compliance
- Updated tasks-template.md to require constitution compliance

## Outcome

- ✅ Impact: Created foundational governance document for the entire project
- 🧪 Tests: No tests required for constitution creation
- 📁 Files: Updated 4 files to ensure constitution alignment
- 🔁 Next prompts: Can now create feature specifications following the constitution
- 🧠 Reflection: Constitution provides clear governance framework for the entire Evolution of Todo project lifecycle

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin creating feature specifications following the new constitution