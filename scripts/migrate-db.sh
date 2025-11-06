#!/bin/bash

# Database migration script
# Runs Prisma migrations on the production database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

echo "========================================="
echo "Running Database Migrations"
echo "========================================="

# Load environment variables safely
if [ -f "$PROJECT_DIR/.env.production" ]; then
    set -a
    while IFS= read -r line || [ -n "$line" ]; do
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        if [[ "$line" =~ ^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
            key="${BASH_REMATCH[1]}"
            value="${BASH_REMATCH[2]}"
            key=$(echo "$key" | xargs)
            value=$(echo "$value" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^["'\'']//' -e 's/["'\'']$//')
            [[ -n "$key" ]] && export "$key=$value" 2>/dev/null || true
        fi
    done < "$PROJECT_DIR/.env.production"
    set +a
fi

# Check if database is accessible
echo "Checking database connection..."
docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U "${POSTGRES_USER:-admin}" || {
    echo "Error: Database is not accessible"
    exit 1
}

# Generate Prisma Client
echo "Generating Prisma Client..."
docker-compose -f docker-compose.prod.yml run --rm app npx prisma generate

# Run migrations
echo "Running migrations..."
docker-compose -f docker-compose.prod.yml run --rm app npx prisma migrate deploy || {
    echo "Migration deploy failed, trying db push..."
    docker-compose -f docker-compose.prod.yml run --rm app npx prisma db push
}

echo "========================================="
echo "Migrations completed!"
echo "========================================="

