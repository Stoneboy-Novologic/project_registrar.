#!/bin/bash

# Safe environment variable loader
# Usage: source this script or call load_env_file <file_path>

load_env_file() {
    local env_file="$1"
    
    if [ ! -f "$env_file" ]; then
        return 1
    fi
    
    # Read file line by line and export valid KEY=VALUE pairs
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        
        # Check if line contains =
        if [[ "$line" =~ ^[[:space:]]*([^#=]+)=(.*)$ ]]; then
            local key="${BASH_REMATCH[1]}"
            local value="${BASH_REMATCH[2]}"
            
            # Remove leading/trailing whitespace from key
            key=$(echo "$key" | xargs)
            
            # Remove quotes from value if present
            value=$(echo "$value" | sed -e 's/^["'\'']//' -e 's/["'\'']$//')
            
            # Export the variable
            export "$key=$value" 2>/dev/null || true
        fi
    done < "$env_file"
}

# If script is sourced directly, load .env.production
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    # Script is being executed directly
    if [ -n "$1" ]; then
        load_env_file "$1"
    else
        SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
        PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
        load_env_file "$PROJECT_DIR/.env.production"
    fi
fi

