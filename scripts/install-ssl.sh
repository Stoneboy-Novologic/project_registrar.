#!/bin/bash

# SSL certificate installation script
# Installs Let's Encrypt SSL certificate using Certbot

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR"

echo "========================================="
echo "Installing SSL Certificate"
echo "========================================="

# Check if domain is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <your-domain.com> [email@example.com]"
    echo ""
    echo "Example: $0 example.com admin@example.com"
    exit 1
fi

DOMAIN="$1"
EMAIL="${2:-admin@$DOMAIN}"

echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# Check if Certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "Error: Certbot is not installed"
    echo "Install it with: sudo apt-get install certbot python3-certbot-nginx"
    exit 1
fi

# Ensure Nginx is configured for HTTP first
if [ ! -f /etc/nginx/sites-available/editor-app ]; then
    echo "Error: Nginx configuration not found"
    echo "Please run deploy.sh first to set up Nginx"
    exit 1
fi

# Update Nginx config with domain
sudo sed -i "s/server_name _;/server_name $DOMAIN;/g" /etc/nginx/sites-available/editor-app

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t || {
    echo "Error: Nginx configuration test failed"
    exit 1
}

# Reload Nginx
sudo systemctl reload nginx

# Obtain certificate
echo "Obtaining SSL certificate from Let's Encrypt..."
sudo certbot certonly \
    --nginx \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    -d "$DOMAIN" \
    --redirect || {
    echo "Error: Failed to obtain certificate"
    exit 1
}

# Update SSL configuration
SSL_CONF="/etc/nginx/ssl.conf"
if [ -f "$PROJECT_DIR/nginx/ssl.conf" ]; then
    sudo cp "$PROJECT_DIR/nginx/ssl.conf" "$SSL_CONF"
    sudo sed -i "s/YOUR_DOMAIN/$DOMAIN/g" "$SSL_CONF"
    echo "SSL configuration updated"
fi

# Update Nginx config to include SSL
sudo sed -i "s|# SSL configuration|include $SSL_CONF;|g" /etc/nginx/sites-available/editor-app || true

# Test Nginx configuration again
sudo nginx -t && sudo systemctl reload nginx

# Set up auto-renewal
echo "Setting up certificate auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo "========================================="
echo "SSL certificate installed successfully!"
echo "========================================="
echo ""
echo "Your site is now available at: https://$DOMAIN"
echo ""
echo "Certificate will auto-renew. Test renewal with:"
echo "  sudo certbot renew --dry-run"
echo ""

