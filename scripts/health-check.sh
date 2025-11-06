#!/bin/bash

# Health check script
# Checks the health of the application and database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

echo "========================================="
echo "Health Check"
echo "========================================="

# Check Docker
echo -n "Checking Docker... "
if command -v docker &> /dev/null && docker info > /dev/null 2>&1; then
    echo "✓ OK"
else
    echo "✗ FAILED"
    exit 1
fi

# Check if containers are running
echo -n "Checking containers... "
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✓ OK"
else
    echo "✗ FAILED - Containers are not running"
    exit 1
fi

# Check database
echo -n "Checking database... "
if docker-compose -f docker-compose.prod.yml exec -T postgres pg_isready -U "${POSTGRES_USER:-admin}" > /dev/null 2>&1; then
    echo "✓ OK"
else
    echo "✗ FAILED"
    exit 1
fi

# Check application health endpoint
echo -n "Checking application... "
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✓ OK"
else
    echo "✗ FAILED"
    exit 1
fi

# Check Nginx
echo -n "Checking Nginx... "
if systemctl is-active --quiet nginx; then
    echo "✓ OK"
else
    echo "✗ FAILED"
    exit 1
fi

echo "========================================="
echo "All health checks passed!"
echo "========================================="

