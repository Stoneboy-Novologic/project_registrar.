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

# Load environment variables
set -a
source "$PROJECT_DIR/.env.production"
set +a

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

