#!/bin/bash

# Database restore script
# Restores PostgreSQL database from a backup file

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

# Check if backup file is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file.sql.gz>"
    echo ""
    echo "Available backups:"
    ls -lh "$PROJECT_DIR/backups/"*.sql.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

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

# Extract database connection details
DB_URL="${DATABASE_URL#postgresql://}"
DB_CREDENTIALS="${DB_URL%%@*}"
DB_USER="${DB_CREDENTIALS%%:*}"
DB_HOST_PORT="${DB_URL#*@}"
DB_HOST="${DB_HOST_PORT%%:*}"
DB_NAME="${DB_HOST_PORT#*/}"
DB_NAME="${DB_NAME%%\?*}"

echo "========================================="
echo "Restoring Database"
echo "========================================="
echo "Database: $DB_NAME"
echo "Backup file: $BACKUP_FILE"
echo ""
read -p "This will overwrite the current database. Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Restore cancelled"
    exit 0
fi

# Stop application to prevent connections
echo "Stopping application..."
docker-compose -f docker-compose.prod.yml stop app || true

# Restore database
echo "Restoring database..."
if [[ "$BACKUP_FILE" == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | docker-compose -f docker-compose.prod.yml exec -T postgres \
        psql -U "$DB_USER" -d "$DB_NAME"
else
    cat "$BACKUP_FILE" | docker-compose -f docker-compose.prod.yml exec -T postgres \
        psql -U "$DB_USER" -d "$DB_NAME"
fi

# Start application
echo "Starting application..."
docker-compose -f docker-compose.prod.yml start app

echo "========================================="
echo "Database restore completed!"
echo "========================================="

