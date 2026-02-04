#!/bin/bash

# Inventory Management System - Setup Verification Script
# This script checks if all prerequisites are installed and configured

echo "=========================================="
echo "Inventory Management System"
echo "Setup Verification Script"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Function to check if command exists
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        if [ ! -z "$2" ]; then
            VERSION=$($1 $2 2>&1 | head -n 1)
            echo "  Version: $VERSION"
        fi
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        ERRORS=$((ERRORS+1))
        return 1
    fi
}

# Function to check port availability
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠${NC} Port $1 is in use"
        return 1
    else
        echo -e "${GREEN}✓${NC} Port $1 is available"
        return 0
    fi
}

echo "Checking Prerequisites..."
echo "=========================================="

# Check Java
echo ""
echo "Java:"
check_command java "-version"

# Check Maven
echo ""
echo "Maven:"
if check_command mvn "-version"; then
    MVN_VERSION=$(mvn -version | grep "Apache Maven" | cut -d ' ' -f 3)
    echo "  Maven version: $MVN_VERSION"
fi

# Check Node.js
echo ""
echo "Node.js:"
check_command node "--version"

# Check npm
echo ""
echo "npm:"
check_command npm "--version"

# Check Docker
echo ""
echo "Docker:"
check_command docker "--version"

# Check Docker Compose
echo ""
echo "Docker Compose:"
check_command docker-compose "--version"

# Check PostgreSQL client (optional)
echo ""
echo "PostgreSQL Client (optional):"
check_command psql "--version"

# Check Git
echo ""
echo "Git:"
check_command git "--version"

echo ""
echo "=========================================="
echo "Checking Ports..."
echo "=========================================="

echo ""
echo "Port 3000 (Frontend):"
check_port 3000

echo ""
echo "Port 8080 (Backend):"
check_port 8080

echo ""
echo "Port 5432 (PostgreSQL):"
check_port 5432

echo ""
echo "=========================================="
echo "Checking Project Structure..."
echo "=========================================="

echo ""
echo "Backend:"
if [ -f "backend/pom.xml" ]; then
    echo -e "${GREEN}✓${NC} pom.xml found"
else
    echo -e "${RED}✗${NC} pom.xml not found"
    ERRORS=$((ERRORS+1))
fi

if [ -d "backend/src/main/java" ]; then
    echo -e "${GREEN}✓${NC} Java source directory exists"
else
    echo -e "${RED}✗${NC} Java source directory missing"
    ERRORS=$((ERRORS+1))
fi

echo ""
echo "Frontend:"
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json found"
else
    echo -e "${RED}✗${NC} package.json not found"
    ERRORS=$((ERRORS+1))
fi

if [ -d "frontend/src" ]; then
    echo -e "${GREEN}✓${NC} Source directory exists"
else
    echo -e "${RED}✗${NC} Source directory missing"
    ERRORS=$((ERRORS+1))
fi

echo ""
echo "=========================================="
echo "Checking Documentation..."
echo "=========================================="

echo ""
DOC_FILES=("README.md" "QUICKSTART.md" "TECHNICAL_SUMMARY.md" "backend/README.md" "frontend/README.md")
for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${YELLOW}⚠${NC} $file missing"
    fi
done

echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "You're ready to start the application!"
    echo ""
    echo "Quick Start:"
    echo "1. Start PostgreSQL:"
    echo "   docker run -d --name inventory-postgres -p 5432:5432 \\"
    echo "     -e POSTGRES_DB=inventory_db \\"
    echo "     -e POSTGRES_USER=postgres \\"
    echo "     -e POSTGRES_PASSWORD=postgres \\"
    echo "     postgres:15-alpine"
    echo ""
    echo "2. Start Backend (in new terminal):"
    echo "   cd backend && ./mvnw quarkus:dev"
    echo ""
    echo "3. Start Frontend (in new terminal):"
    echo "   cd frontend && npm install && npm start"
    echo ""
    echo "Or use Docker Compose:"
    echo "   docker-compose up -d"
else
    echo -e "${RED}✗ $ERRORS error(s) found!${NC}"
    echo ""
    echo "Please install missing prerequisites:"
    echo "- Java 17+: https://adoptium.net/"
    echo "- Maven 3.8+: https://maven.apache.org/"
    echo "- Node.js 16+: https://nodejs.org/"
    echo "- Docker: https://www.docker.com/"
    echo ""
    echo "See QUICKSTART.md for detailed setup instructions."
fi

echo ""
echo "=========================================="
