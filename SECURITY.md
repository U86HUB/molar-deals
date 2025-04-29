
# Security Policy

## Supported Versions

This project is currently under active development. We provide security updates for the latest version only.

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. Do not disclose the vulnerability publicly until it has been addressed.
2. Email us at [security@example.com](mailto:security@example.com) with details about the vulnerability.
3. Allow some time for us to address the vulnerability before any public disclosure.

## Recent Security Fixes

### April 2025 Security Updates

We've updated the following dependencies to address security vulnerabilities:

- vite: updated to ^6.2.6
- esbuild: updated to ^0.25.0
- @babel/runtime: pinned to 7.26.10
- @babel/helpers: pinned to 7.26.10

To apply these updates:

```bash
# Update security overrides
./update-overrides.sh

# Regenerate lockfile
rm -rf node_modules package-lock.json
npm install

# Commit changes
git add package.json package-lock.json
git commit -m "chore: upgrade deps to fix security alerts"
git push
```

Confirm in the Security → Dependabot alerts tab that all alerts have been closed after applying these updates.
