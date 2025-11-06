#!/bin/bash

# Main deployment script
# Builds and deploys the Next.js application with Docker

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

echo "========================================="
echo "Deploying Next.js Application"
echo "========================================="

# Check if .env.production exists
if [ ! -f "$PROJECT_DIR/.env.production" ]; then
    echo "Warning: .env.production not found. Creating from template..."
    if [ -f "$PROJECT_DIR/.env.example" ]; then
        cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env.production"
        echo "Please update .env.production with your actual values"
        exit 1
    else
        echo "Error: .env.production not found and no .env.example to copy"
        exit 1
    fi
fi

# Load environment variables
set -a
source "$PROJECT_DIR/.env.production"
set +a

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Stop existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Pull latest code (if using git)
if [ -d "$PROJECT_DIR/.git" ]; then
    echo "Pulling latest code..."
    git pull origin main || git pull origin master || true
fi

# Build Docker image
echo "Building Docker image..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Run database migrations
echo "Running database migrations..."
docker-compose -f docker-compose.prod.yml run --rm app npx prisma migrate deploy || \
docker-compose -f docker-compose.prod.yml run --rm app npx prisma db push || true

# Start containers
echo "Starting containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 10

# Check health
echo "Checking application health..."
for i in {1..30}; do
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "Application is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "Warning: Application health check failed after 30 attempts"
        echo "Check logs with: docker-compose -f docker-compose.prod.yml logs"
    fi
    sleep 2
done

# Update Nginx configuration
echo "Updating Nginx configuration..."
if [ -f "$PROJECT_DIR/nginx/nginx.conf" ]; then
    sudo cp "$PROJECT_DIR/nginx/nginx.conf" /etc/nginx/sites-available/editor-app
    if [ ! -f /etc/nginx/sites-enabled/editor-app ]; then
        sudo ln -s /etc/nginx/sites-available/editor-app /etc/nginx/sites-enabled/
    fi
    sudo nginx -t && sudo systemctl reload nginx
    echo "Nginx configuration updated"
fi

echo "========================================="
echo "Deployment completed!"
echo "========================================="
echo ""
echo "Application is running at: http://localhost:3000"
echo "View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo ""

