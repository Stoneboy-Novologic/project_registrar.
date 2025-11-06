#!/bin/bash

# Database backup script
# Creates a timestamped backup of PostgreSQL database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

# Load environment variables
set -a
source "$PROJECT_DIR/.env.production"
set +a

# Backup directory
BACKUP_DIR="$PROJECT_DIR/backups"
mkdir -p "$BACKUP_DIR"

# Generate backup filename
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
BACKUP_FILE_COMPRESSED="$BACKUP_FILE.gz"

echo "========================================="
echo "Creating Database Backup"
echo "========================================="

# Extract database connection details from DATABASE_URL
# Format: postgresql://user:password@host:port/database
DB_URL="${DATABASE_URL#postgresql://}"
DB_CREDENTIALS="${DB_URL%%@*}"
DB_USER="${DB_CREDENTIALS%%:*}"
DB_PASS="${DB_CREDENTIALS#*:}"
DB_HOST_PORT="${DB_URL#*@}"
DB_HOST="${DB_HOST_PORT%%:*}"
DB_PORT="${DB_HOST_PORT#*:}"
DB_PORT="${DB_PORT%%/*}"
DB_NAME="${DB_HOST_PORT#*/}"
DB_NAME="${DB_NAME%%\?*}"

echo "Backing up database: $DB_NAME"
echo "Host: $DB_HOST"
echo "Backup file: $BACKUP_FILE_COMPRESSED"

# Create backup using pg_dump inside the postgres container
docker-compose -f docker-compose.prod.yml exec -T postgres \
    pg_dump -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_FILE_COMPRESSED"

if [ -f "$BACKUP_FILE_COMPRESSED" ] && [ -s "$BACKUP_FILE_COMPRESSED" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE_COMPRESSED" | cut -f1)
    echo "Backup created successfully!"
    echo "Size: $BACKUP_SIZE"
    echo "Location: $BACKUP_FILE_COMPRESSED"
    
    # Keep only last 30 backups
    echo "Cleaning up old backups (keeping last 30)..."
    ls -t "$BACKUP_DIR"/db_backup_*.sql.gz | tail -n +31 | xargs -r rm
    
    echo "========================================="
    echo "Backup completed successfully!"
    echo "========================================="
else
    echo "Error: Backup file was not created or is empty"
    exit 1
fi

