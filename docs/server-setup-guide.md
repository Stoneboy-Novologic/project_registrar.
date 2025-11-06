# EC2 Server Setup Guide

Step-by-step guide for setting up a fresh EC2 instance for the Next.js application.

## Quick Start

```bash
# 1. SSH into EC2 instance
ssh -i your-key.pem ubuntu@<EC2-IP>

# 2. Clone repository
git clone <your-repo-url> editor-test
cd editor-test

# 3. Run setup script
chmod +x scripts/*.sh
./scripts/setup-server.sh

# 4. Log out and back in
exit
ssh -i your-key.pem ubuntu@<EC2-IP>

# 5. Configure environment
nano .env.production
# Add your environment variables

# 6. Deploy
./scripts/deploy.sh
```

## Detailed Setup

### 1. Launch EC2 Instance

#### Instance Configuration
- **AMI**: Ubuntu Server 22.04 LTS (HVM)
- **Instance Type**: 
  - Minimum: t3.medium (2 vCPU, 4GB RAM)
  - Recommended: t3.large (2 vCPU, 8GB RAM) for production
- **Storage**: 20GB gp3 SSD (minimum)

#### Security Group Rules
| Type | Protocol | Port Range | Source |
|------|----------|-------------|--------|
| SSH | TCP | 22 | Your IP / 0.0.0.0/0 |
| HTTP | TCP | 80 | 0.0.0.0/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0 |

#### Key Pair
- Create new key pair or use existing
- Download and save private key securely
- Set permissions: `chmod 400 your-key.pem`

### 2. Allocate Elastic IP

1. Go to EC2 Console → Elastic IPs
2. Click "Allocate Elastic IP address"
3. Select "Amazon's pool of IPv4 addresses"
4. Click "Allocate"
5. Select the Elastic IP → Actions → Associate Elastic IP address
6. Select your instance and click "Associate"

### 3. Connect to Instance

```bash
ssh -i your-key.pem ubuntu@<ELASTIC-IP>
```

### 4. Run Setup Script

The setup script installs:
- Docker and Docker Compose
- Nginx web server
- Certbot (for SSL certificates)
- Firewall configuration (UFW)
- Required system packages

```bash
# Clone repository
git clone <your-repo-url> editor-test
cd editor-test

# Make scripts executable
chmod +x scripts/*.sh

# Run setup
./scripts/setup-server.sh
```

**Note**: You'll need to log out and log back in after setup to apply Docker group changes.

### 5. Verify Installation

```bash
# Check Docker
docker --version
docker-compose --version

# Check Nginx
nginx -v
sudo systemctl status nginx

# Check firewall
sudo ufw status
```

### 6. Configure Environment Variables

Create `.env.production` file:

```bash
cd ~/editor-test
nano .env.production
```

Minimum required variables:
```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=<strong-password>
POSTGRES_DB=editor_db
DATABASE_URL=postgresql://admin:<strong-password>@postgres:5432/editor_db?schema=public
NODE_ENV=production
```

Save and secure:
```bash
chmod 600 .env.production
```

### 7. Initial Deployment

```bash
./scripts/deploy.sh
```

This will:
1. Build Docker images
2. Start PostgreSQL container
3. Run database migrations
4. Start Next.js application
5. Configure Nginx
6. Perform health checks

### 8. Verify Deployment

```bash
# Check containers
docker-compose -f docker-compose.prod.yml ps

# Check application
curl http://localhost:3000/api/health

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 9. Configure Domain and SSL (Optional)

1. **Point domain to Elastic IP**
   - Update DNS A record: `your-domain.com` → `<ELASTIC-IP>`
   - Wait for DNS propagation

2. **Install SSL certificate**
   ```bash
   ./scripts/install-ssl.sh your-domain.com your-email@example.com
   ```

3. **Verify HTTPS**
   - Visit `https://your-domain.com`
   - Check SSL certificate

### 10. Set Up Automated Backups

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /home/ubuntu/editor-test && ./scripts/backup-db.sh >> /var/log/db-backup.log 2>&1
```

## Post-Setup Checklist

- [ ] Docker and Docker Compose installed
- [ ] Nginx installed and configured
- [ ] Firewall rules configured
- [ ] Environment variables set
- [ ] Application deployed and running
- [ ] Health checks passing
- [ ] SSL certificate installed (if using domain)
- [ ] Automated backups configured
- [ ] GitHub Actions configured (optional)
- [ ] Monitoring set up (optional)

## Common Issues

### Docker permission denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

### Port already in use
```bash
# Check what's using the port
sudo lsof -i :3000
# Stop the service or change port
```

### Database connection failed
```bash
# Check PostgreSQL container
docker-compose -f docker-compose.prod.yml ps postgres
# Check DATABASE_URL in .env.production
# Verify network connectivity
docker-compose -f docker-compose.prod.yml exec postgres psql -U admin -d editor_db
```

### Nginx configuration error
```bash
# Test configuration
sudo nginx -t
# Check error logs
sudo tail -f /var/log/nginx/error.log
```

## Next Steps

After setup is complete:
1. Review [AWS EC2 Deployment Guide](./aws-ec2-deployment.md)
2. Set up monitoring and alerts
3. Configure log rotation
4. Review security settings
5. Test backup and restore procedures

## Support

For issues during setup:
1. Check script output for errors
2. Review logs: `docker-compose -f docker-compose.prod.yml logs`
3. Verify all prerequisites are met
4. Check AWS console for instance status

