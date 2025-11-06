# Next.js Vercel to AWS EC2 Migration Plan

## Architecture Decision

**Recommended Stack: AWS EC2 + Docker + Self-Contained PostgreSQL + Nginx**

**Why EC2 with Docker:**

- ✅ Full control over environment (required for Playwright headless browser)
- ✅ Cost-effective: Single EC2 instance vs multiple AWS services (~$30-45/month)
- ✅ Self-contained: PostgreSQL on same instance (no RDS costs)
- ✅ Simpler architecture: Easier to manage and debug
- ✅ Docker containerization: Consistent deployments
- ✅ Nginx reverse proxy: Professional routing and SSL termination
- ✅ Perfect for small to medium scale applications
- ✅ Can install Playwright system dependencies in Docker image

**Why not ECS/RDS:**

- ❌ More expensive (multiple services ~$110-155/month)
- ❌ More complex setup and management
- ❌ Overkill for single application deployment

## Migration Components

### 1. Infrastructure Setup

- **AWS EC2 Instance**: t3.medium or t3.large (2-4 vCPU, 4-8GB RAM recommended for Playwright)
- **Security Group**: Configure ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
- **Elastic IP**: Static IP address for the instance
- **Domain & SSL**: Route53 (optional) + Let's Encrypt via Certbot

### 2. Docker Configuration

- Create `Dockerfile` optimized for Next.js + Playwright
- Install Playwright Chromium and dependencies
- Multi-stage build for smaller image size
- Health check endpoint
- Docker Compose for local development/testing

### 3. PostgreSQL Setup (Self-Contained)

- PostgreSQL running in Docker container on EC2
- Persistent volume for database data
- Automated backup scripts
- Connection via Docker network

### 4. Nginx Configuration

- Reverse proxy configuration for Next.js app
- SSL/TLS termination with Let's Encrypt
- Static file serving (optional optimization)
- Rate limiting and security headers
- Health check endpoint routing

### 5. Auto-Deploy Scripts

- `scripts/deploy.sh`: Main deployment script
- `scripts/setup-server.sh`: Initial EC2 server setup
- `scripts/backup-db.sh`: Database backup automation
- `scripts/update-app.sh`: Zero-downtime app updates
- GitHub Actions or webhook for automated deployments

### 6. Database Migration

- Migrate schema using Prisma migrations
- Data migration script (if needed)
- Backup and restore procedures

### 7. Environment Variables

- `.env.production` file on EC2 (secured)
- Docker environment variable injection
- Secrets management via encrypted files

### 8. Monitoring & Logging

- Docker logs management
- System monitoring (optional: CloudWatch agent)
- Nginx access/error logs
- Application health checks

## Files to Create/Modify

### New Files:

- `Dockerfile` - Container image definition with Next.js + Playwright
- `.dockerignore` - Docker build exclusions
- `docker-compose.yml` - Local development and production orchestration
- `docker-compose.prod.yml` - Production-specific Docker Compose config
- `nginx/nginx.conf` - Nginx reverse proxy configuration
- `nginx/ssl.conf` - SSL/TLS configuration template
- `scripts/` directory:
- `setup-server.sh` - Initial EC2 server setup (Docker, Nginx, PostgreSQL)
- `deploy.sh` - Main deployment script (build, deploy, restart)
- `update-app.sh` - Zero-downtime app update script
- `backup-db.sh` - Database backup automation
- `restore-db.sh` - Database restore script
- `migrate-db.sh` - Database migration script
- `health-check.sh` - Application health check
- `install-ssl.sh` - SSL certificate installation via Certbot
- `.github/workflows/deploy.yml` - CI/CD pipeline for auto-deployment
- `docs/aws-ec2-deployment.md` - Comprehensive deployment documentation
- `docs/server-setup-guide.md` - Step-by-step EC2 setup guide

### Files to Modify:

- `package.json` - Add Docker build scripts and deployment commands
- `next.config.ts` - Ensure production optimizations, add output config if needed
- `lib/prisma.ts` - Verify connection handling for Docker network
- `README.md` - Update deployment instructions with EC2 setup

## Key Considerations

1. **Playwright Dependencies**: Dockerfile must install Chromium and system libraries (`playwright install chromium`)
2. **Memory Requirements**: EC2 instance needs 4GB+ RAM (t3.medium recommended) for Playwright + PostgreSQL + Next.js
3. **Database Persistence**: Use Docker volumes for PostgreSQL data to survive container restarts
4. **Database Connection**: Connect via Docker network (e.g., `postgres://user:pass@postgres:5432/dbname`)
5. **Zero-Downtime Deployments**: Use blue-green deployment or rolling updates with health checks
6. **Backup Strategy**: Automated daily backups of PostgreSQL data
7. **SSL Certificates**: Use Let's Encrypt (free) with auto-renewal via Certbot
8. **Static Assets**: Nginx can serve static files directly for better performance
9. **PDF Storage**: Store in `/tmp` or mounted volume, or optionally use S3

## Migration Steps

1. **EC2 Setup**:

- Launch EC2 instance (Ubuntu 22.04 LTS recommended)
- Configure security group (ports 22, 80, 443)
- Allocate Elastic IP
- SSH into instance

2. **Server Initialization**:

- Run `scripts/setup-server.sh` to install Docker, Docker Compose, Nginx
- Set up PostgreSQL container with persistent volume
- Configure Nginx with basic HTTP setup

3. **Application Deployment**:

- Create Dockerfile with Next.js + Playwright
- Build and test Docker image locally
- Push code to EC2 (via Git or SCP)
- Run `scripts/deploy.sh` for first deployment

4. **Database Migration**:

- Run Prisma migrations on EC2
- Migrate data from current database (if needed)
- Verify database connectivity

5. **SSL Setup**:

- Point domain to EC2 Elastic IP
- Run `scripts/install-ssl.sh` to get Let's Encrypt certificate
- Update Nginx config for HTTPS

6. **Auto-Deploy Setup**:

- Configure GitHub Actions or webhook
- Test automated deployment
- Set up backup automation

7. **Monitoring & Maintenance**:

- Set up log rotation
- Configure health checks
- Test backup/restore procedures

8. **Final Steps**:

- Update DNS records
- Decommission Vercel deployment
- Monitor for issues

## Estimated Costs (Monthly)

- **EC2 t3.medium** (2 vCPU, 4GB RAM): ~$30-35/month
- **Elastic IP**: Free (if instance running)
- **Data Transfer** (first 100GB free): ~$0-10/month
- **Domain** (Route53, optional): ~$0.50/month
- **Total**: ~$30-45/month (vs Vercel Pro ~$20/month, but full control and no limits)

**Cost Savings**: Much cheaper than ECS+RDS approach (~$110-155/month)

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Docker installed locally
- Database backup from current setup
- Domain name (if using custom domain)