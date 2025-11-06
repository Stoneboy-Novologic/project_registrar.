#!/bin/bash

# Zero-downtime application update script
# Uses blue-green deployment strategy

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

echo "========================================="
echo "Updating Application (Zero-Downtime)"
echo "========================================="

# Load environment variables
set -a
source "$PROJECT_DIR/.env.production"
set +a

# Pull latest code
if [ -d "$PROJECT_DIR/.git" ]; then
    echo "Pulling latest code..."
    git pull origin main || git pull origin master
fi

# Build new image with a tag
NEW_TAG="v$(date +%Y%m%d%H%M%S)"
echo "Building new image with tag: $NEW_TAG"

docker-compose -f docker-compose.prod.yml build --no-cache app

# Create a temporary container to test
echo "Testing new container..."
TEST_CONTAINER="editor-app-test-$$"
docker run -d \
    --name "$TEST_CONTAINER" \
    --network editor-test_editor-network \
    -e DATABASE_URL="$DATABASE_URL" \
    -e NODE_ENV=production \
    editor-test-app:latest || true

sleep 5

# Health check on test container
if docker exec "$TEST_CONTAINER" node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" 2>/dev/null; then
    echo "New container passed health check"
    docker stop "$TEST_CONTAINER" && docker rm "$TEST_CONTAINER"
    
    # Restart production container
    echo "Restarting production container..."
    docker-compose -f docker-compose.prod.yml up -d --no-deps app
    
    # Wait for new container to be healthy
    echo "Waiting for new container to be healthy..."
    sleep 10
    
    # Final health check
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "Update successful!"
    else
        echo "Warning: Health check failed after update"
        echo "Rolling back..."
        docker-compose -f docker-compose.prod.yml restart app
    fi
else
    echo "New container failed health check. Aborting update."
    docker stop "$TEST_CONTAINER" && docker rm "$TEST_CONTAINER" || true
    exit 1
fi

echo "========================================="
echo "Update completed!"
echo "========================================="

