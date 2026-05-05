### Setup
- Copy env templates, input values
  - generate `AUTH_SECRET` (in `frontend/.env.local`) with `openssl rand -base64 32` — any random 32+ byte value, per-dev
- cd frontend -> pnpm install 
- cd backend -> uv sync 
- launch backend: docker compose up (from root)
- launch frontend: pnpm dev (from frontend)

