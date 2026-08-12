# CodeForge AI — API Endpoints Reference

## Authentication API (`/api/auth`)
- `POST /api/auth/register` — Register a new user account.
- `POST /api/auth/login` — Authenticate and receive JWT bearer token.
- `GET /api/auth/me` — Retrieve current user profile context (Requires `Authorization: Bearer <token>`).

## Program Management API (`/api/programs`)
- `POST /api/programs` — Save a new program.
- `GET /api/programs` — Retrieve all saved programs for authenticated user.
- `GET /api/programs/:id` — Retrieve program details with version snapshots and recent execution history.
- `PUT /api/programs/:id` — Update existing program code (optionally creating a new version snapshot).
- `DELETE /api/programs/:id` — Delete a program.

## Execution API (`/api/executions`)
- `POST /api/executions` — Execute source code in specified language with optional stdin input.
- `GET /api/executions` — Retrieve execution history log records with language/status filter options.
- `GET /api/executions/:id` — Retrieve detailed log for a specific execution run.

## AI Assistant API (`/api/ai`)
- `POST /api/ai/analyze` — Request AI error analysis, root-cause diagnosis, and corrected code generation.
- `POST /api/ai/optimize` — Request code performance, complexity, and readability optimization.
