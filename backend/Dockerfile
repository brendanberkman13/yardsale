FROM python:3.13-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

# Put the venv outside /app so a bind mount over /app in dev doesn't clobber it
ENV UV_PROJECT_ENVIRONMENT=/venv
ENV UV_LINK_MODE=copy
ENV PATH="/venv/bin:$PATH"

WORKDIR /app

# Cache deps independently of source
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project

# Source is bind-mounted in dev (compose); copy for prod-like builds too
COPY . .

EXPOSE 8000

CMD ["fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "8000"]
