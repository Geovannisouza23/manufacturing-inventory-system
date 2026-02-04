#!/bin/bash
cd /root/workspace/fullstack.test

# Clean git
rm -rf .git

# Reinitialize
git init
git config user.email "geovannisouza23@gmail.com"
git config user.name "Geovannisouza23"
git checkout -b main

# Stage files
git add .github/ docs/ README.md docker-compose.yml

# Commit
git commit -m "Add CI/CD workflows, documentation and project configuration"

# Add remote
git remote add origin https://github.com/Geovannisouza23/manufacturing-inventory-system.git

# Force push
git push -u origin main --force

echo "Push completed successfully!"
