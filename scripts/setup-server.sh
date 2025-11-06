#!/bin/bash

# Setup script for EC2 instance
# Installs Docker, Docker Compose, Nginx, and sets up the environment
# Run this script on a fresh Ubuntu 22.04 EC2 instance

set -e

echo "========================================="
echo "Setting up EC2 server for Next.js app"
echo "========================================="

# Update system
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
echo "Installing required packages..."
sudo apt-get install -y \
    curl \
    wget \
    git \
    ca-certificates \
    gnupg \
    lsb-release \
    certbot \
    python3-certbot-nginx \
    ufw

# Install Docker
echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "Docker installed successfully"
else
    echo "Docker is already installed"
fi

# Install Docker Compose
echo "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "Docker Compose installed successfully"
else
    echo "Docker Compose is already installed"
fi

# Install Nginx
echo "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt-get install -y nginx
    sudo systemctl enable nginx
    echo "Nginx installed successfully"
else
    echo "Nginx is already installed"
fi

# Configure firewall
echo "Configuring firewall..."
sudo ufw --force enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
echo "Firewall configured"

# Create application directories
echo "Creating application directories..."
sudo mkdir -p /var/lib/editor/{postgres_data,app_logs}
sudo mkdir -p /var/www/certbot
sudo chown -R $USER:$USER /var/lib/editor

# Create Nginx directories
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

echo "========================================="
echo "Server setup completed!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Log out and log back in (or run: newgrp docker)"
echo "2. Clone your repository to /home/$USER/editor-test"
echo "3. Copy .env.production file with your environment variables"
echo "4. Run: ./scripts/deploy.sh"
echo ""

