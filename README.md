# Cattydicking

The Legend Lives On — Est. 1839

A Node.js web application celebrating the legacy of Jeremiah "Jimbo" and the art of cattydicking.

## Local Development

### Prerequisites
- Node.js 18+ 
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

The application will be available at `http://localhost:61080`

## Deployment

### Ansible Deployment

Deploy to host74.nird.club using Ansible:

```bash
ansible-playbook --ask-vault-pass -u ansible --private-key ~/.ssh/keys/nirdclub__id_ed25519 ~/Documents/version-control/git/cattydicking/playbooks/cattydicking-ansible.yml --limit host74.nird.club
```

### Manual Deployment

1. Install Node.js 18+ on the target server
2. Copy application files to `/opt/cattydicking/`
3. Install dependencies: `npm install --production`
4. Create systemd service file
5. Start the service: `systemctl start cattydicking`

## Features

- Responsive design with vintage western styling
- Rotating quotes about Jeremiah "Jimbo"
- Health check endpoint at `/health`
- Security headers and compression
- Graceful shutdown handling

## Architecture

- **Frontend**: Static HTML/CSS/JavaScript
- **Backend**: Node.js with Express.js
- **Deployment**: Ansible playbook for automated deployment
- **Process Management**: systemd service
- **Security**: Helmet.js for security headers, UFW firewall

## License

MIT License - see LICENSE file for details.
# Test PR Deploy Flow

This is a test commit to verify the GitHub Actions deployment workflow works properly.

- Added test comment to verify CI/CD pipeline
- Should trigger deployment after merge to main
