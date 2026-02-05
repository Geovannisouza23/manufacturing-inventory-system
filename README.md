# 📦 Inventory Management System

<p align="center">
  <img src="https://img.shields.io/badge/Java-11-orange?style=for-the-badge&logo=java" />
  <img src="https://img.shields.io/badge/Quarkus-2.16.12-blue?style=for-the-badge&logo=quarkus" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker" />
</p>

<p align="center">
  A fullstack web application for managing industrial inventory, products, raw materials, and production planning.
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture Diagram](#-architecture-diagram)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Option 1: Docker (Recommended)](#option-1-docker-recommended)
  - [Option 2: Manual Setup](#option-2-manual-setup)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Features](#-features)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [CI/CD](#-cicd)
- [Documentation](#-documentation)

---

## 🎯 Overview

This system was developed to help industries control inventory of raw materials needed for production. It allows:

- ✅ Managing products and raw materials (CRUD operations)
- ✅ Associating raw materials with products
- ✅ Calculating production capacity based on available stock
- ✅ Prioritizing production by product value
- ✅ Real-time production value calculation

---

## 🏗️ Architecture Diagram

![Architecture Diagram]([docs/architecture-diagram.drawio](https://drive.google.com/file/d/1m9yLnTVUNiQA3cV3v0gR_b1E1ZS2D8Cf/view?usp=sharing))

The project follows a modern fullstack architecture with complete separation of concerns:

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │────────▶│   React     │────────▶│   Quarkus   │
│  (Port 3000)│◀────────│   Frontend  │◀────────│   Backend   │
└─────────────┘         └─────────────┘         │  (Port 8080)│
                                                 └──────┬──────┘
                                                        │
                                                        ▼
                                                 ┌─────────────┐
                                                 │ PostgreSQL  │
                                                 │ (Port 5433) │
                                                 └─────────────┘
```

**Layers:**
- **Frontend**: React 18 + Redux Toolkit + React Router v6
- **Backend**: Quarkus REST API with layered architecture (Resources → Services → Repositories → Entities)
- **Database**: PostgreSQL 15 with JPA/Hibernate
- **Infrastructure**: Docker Compose for orchestration

---

## 💻 Prerequisites

### Required Software

| Software | Version | Purpose | Download |
|----------|---------|---------|----------|
| **Docker** | 20.10+ | Container runtime | [Get Docker](https://docs.docker.com/get-docker/) |
| **Docker Compose** | 2.0+ | Multi-container orchestration | Included with Docker Desktop |
| **Git** | 2.30+ | Version control | [Download Git](https://git-scm.com/downloads) |

### Optional (for manual setup)

| Software | Version | Purpose | Download |
|----------|---------|---------|----------|
| **Java JDK** | 11 | Backend runtime | [OpenJDK 11](https://adoptium.net/) |
| **Maven** | 3.6.3+ | Build tool | [Download Maven](https://maven.apache.org/download.cgi) |
| **Node.js** | 18+ | Frontend runtime | [Download Node.js](https://nodejs.org/) |
| **PostgreSQL** | 15+ | Database (if not using Docker) | [Download PostgreSQL](https://www.postgresql.org/download/) |

---

## 🚀 Installation

### Option 1: Docker (Recommended)

**This is the fastest way to get the entire application running!**

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Geovannisouza23/manufacturing-inventory-system.git
cd manufacturing-inventory-system
```

#### Step 2: Start All Services

```bash
# Start all containers (database, backend, frontend)
docker-compose up --build -d
```

This single command will:
- ✅ Create PostgreSQL database container (port 5433)
- ✅ Build and start Quarkus backend (port 8080)
- ✅ Build and start React frontend (port 3000)
- ✅ Set up networking between containers
- ✅ Initialize database schema

#### Step 3: Verify Services

```bash
# Check if all containers are running
docker-compose ps

# Expected output:
# NAME                          STATUS              PORTS
# fullstack.test-backend-1      Up                  0.0.0.0:8080->8080/tcp
# fullstack.test-frontend-1     Up                  0.0.0.0:3000->3000/tcp
# fullstack.test-postgres-1     Up                  0.0.0.0:5433->5432/tcp
```

#### Step 4: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui

#### Docker Commands Reference

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Rebuild containers
docker-compose up --build -d

# Stop and remove all containers, networks, volumes
docker-compose down -v

# Access backend container shell
docker-compose exec backend /bin/bash

# Access frontend container shell
docker-compose exec frontend /bin/sh

# Access database
docker-compose exec postgres psql -U postgres -d inventory_db
```

#### Troubleshooting Docker

**Port already in use:**
```bash
# Find process using the port
lsof -i :3000  # or :8080 or :5433

# Kill the process
kill -9 <PID>
```

**Container fails to start:**
```bash
# View detailed logs
docker-compose logs <service-name>

# Rebuild from scratch
docker-compose down -v
docker-compose up --build -d
```

**Database connection issues:**
```bash
# Verify database is running
docker-compose exec postgres psql -U postgres -c "SELECT version();"

# Check database exists
docker-compose exec postgres psql -U postgres -l
```

---

### Option 2: Manual Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Geovannisouza23/manufacturing-inventory-system.git
cd manufacturing-inventory-system
```

#### Step 2: Database Setup

**Using Docker:**
```bash
docker run -d \
  --name inventory-postgres \
  -e POSTGRES_DB=inventory_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  postgres:15-alpine
```

**Or install PostgreSQL locally and create database:**
```sql
CREATE DATABASE inventory_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO postgres;
```

#### Step 3: Backend Setup

```bash
cd backend

# Install dependencies and run
./mvnw clean install
./mvnw quarkus:dev

# Or use Maven directly
mvn clean install
mvn quarkus:dev
```

**Backend will be available at:**
- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui
- Health: http://localhost:8080/q/health

#### Step 4: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend will be available at:**
- Application: http://localhost:3000

#### Step 5: Verify Installation

Test the backend:
```bash
curl http://localhost:8080/api/products
```

Expected response: `[]` (empty array)

---

## 📁 Project Structure

```
fullstack.test/
├── 📂 backend/                     # Quarkus Backend
│   ├── 📂 src/
│   │   ├── 📂 main/
│   │   │   ├── 📂 java/com/inventory/
│   │   │   │   ├── 📂 dto/           # Data Transfer Objects
│   │   │   │   │   ├── ProductDTO.java
│   │   │   │   │   ├── RawMaterialDTO.java
│   │   │   │   │   └── ProductionReportDTO.java
│   │   │   │   ├── 📂 entity/        # JPA Entities
│   │   │   │   │   ├── Product.java
│   │   │   │   │   ├── RawMaterial.java
│   │   │   │   │   └── ProductMaterial.java
│   │   │   │   ├── 📂 repository/    # Panache Repositories
│   │   │   │   │   ├── ProductRepository.java
│   │   │   │   │   ├── RawMaterialRepository.java
│   │   │   │   │   └── ProductMaterialRepository.java
│   │   │   │   ├── 📂 resource/      # REST Controllers
│   │   │   │   │   ├── ProductResource.java
│   │   │   │   │   ├── RawMaterialResource.java
│   │   │   │   │   └── ProductionResource.java
│   │   │   │   └── 📂 service/       # Business Logic
│   │   │   │       ├── ProductService.java
│   │   │   │       ├── RawMaterialService.java
│   │   │   │       └── ProductionService.java
│   │   │   └── 📂 resources/
│   │   │       ├── application.properties
│   │   │       └── import.sql
│   │   └── 📂 test/                  # JUnit Tests
│   │       └── java/com/inventory/
│   ├── pom.xml                      # Maven configuration
│   ├── Dockerfile                   # Backend container
│   └── README.md
│
├── 📂 frontend/                    # React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable Components
│   │   │   └── Navbar.js
│   │   ├── 📂 pages/               # Page Components
│   │   │   ├── Home.js
│   │   │   ├── ProductsList.js
│   │   │   ├── ProductForm.js
│   │   │   ├── RawMaterialsList.js
│   │   │   ├── RawMaterialForm.js
│   │   │   └── Production.js
│   │   ├── 📂 services/            # API Services
│   │   │   └── api.js
│   │   ├── 📂 store/               # Redux Store
│   │   │   ├── store.js
│   │   │   ├── selectors.js        # Memoized selectors
│   │   │   └── 📂 slices/          # Redux Slices
│   │   │       ├── productsSlice.js
│   │   │       ├── rawMaterialsSlice.js
│   │   │       └── productionSlice.js
│   │   ├── 📂 __tests__/           # Jest Tests
│   │   │   ├── App.test.js
│   │   │   ├── ProductsList.test.js
│   │   │   ├── ProductForm.test.js
│   │   │   ├── productsSlice.test.js
│   │   │   ├── selectors.test.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── 📂 cypress/                 # Cypress E2E Tests
│   │   ├── 📂 e2e/
│   │   └── cypress.config.js
│   ├── package.json
│   ├── Dockerfile                  # Frontend container
│   └── README.md
│
├── 📂 .github/                     # GitHub Actions
│   └── 📂 workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       ├── e2e-tests.yml
│       ├── code-quality.yml
│       ├── docker-build.yml
│       └── full-ci-cd.yml
│
├── 📂 docs/                        # Documentation
│   ├── architecture-diagram.drawio  # Architecture diagram
│   ├── QUICKSTART.md
│   ├── TECHNICAL_SUMMARY.md
│   ├── PRESENTATION.md
│   ├── FILE_INDEX.md
│   ├── CI_CD.md
│   └── verify-setup.sh
│
├── docker-compose.yml              # Docker orchestration
├── .gitignore
└── README.md                       # This file
```

---

## 🛠️ Technologies

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 11 | Programming language |
| **Quarkus** | 2.16.12.Final | Supersonic Subatomic Java Framework |
| **Hibernate ORM** | with Panache | Object-Relational Mapping |
| **RESTEasy Reactive** | - | REST API framework |
| **PostgreSQL Driver** | - | Database connectivity |
| **JUnit 5** | - | Unit testing |
| **Rest Assured** | - | API testing |
| **Maven** | 3.6.3 | Build tool |

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18 | UI library |
| **Redux Toolkit** | - | State management |
| **React Router** | 6.21.1 | Client-side routing |
| **Axios** | - | HTTP client |
| **Jest** | - | Unit testing |
| **React Testing Library** | - | Component testing |
| **Cypress** | - | E2E testing |
| **Node.js** | 18+ | Runtime environment |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **PostgreSQL** | Relational database |
| **GitHub Actions** | CI/CD pipeline |

---

## ✨ Features

### Functional Requirements

| ID | Feature | Status |
|----|---------|--------|
| **RF001** | Backend CRUD for products | ✅ Implemented |
| **RF002** | Backend CRUD for raw materials | ✅ Implemented |
| **RF003** | Backend CRUD for product-material associations | ✅ Implemented |
| **RF004** | Backend production calculation endpoint | ✅ Implemented |
| **RF005** | Frontend interface for products CRUD | ✅ Implemented |
| **RF006** | Frontend interface for raw materials CRUD | ✅ Implemented |
| **RF007** | Frontend interface for product-material associations | ✅ Implemented |
| **RF008** | Frontend interface for production calculation | ✅ Implemented |

### Additional Features

- ✅ **Memoized Redux Selectors** - Performance optimization with `createSelector`
- ✅ **Safe State Management** - Fallback defaults for undefined state
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Loading States** - User feedback during async operations
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Form Validation** - Real-time input validation
- ✅ **Confirmation Dialogs** - Prevent accidental deletions
- ✅ **Docker Support** - Complete containerization
- ✅ **Comprehensive Testing** - 100+ tests (unit, integration, E2E)
- ✅ **CI/CD Pipeline** - Automated testing and deployment

---

## 🗄️ Database Schema

### Tables

**products**
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);
```

**raw_materials**
```sql
CREATE TABLE raw_materials (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  stock_quantity INTEGER NOT NULL
);
```

**product_materials**
```sql
CREATE TABLE product_materials (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  raw_material_id BIGINT NOT NULL REFERENCES raw_materials(id) ON DELETE CASCADE,
  quantity_required INTEGER NOT NULL,
  UNIQUE(product_id, raw_material_id)
);
```

### Relationships

- **Product** ←→ **ProductMaterial** (One-to-Many)
- **RawMaterial** ←→ **ProductMaterial** (One-to-Many)
- **Product** ←→ **RawMaterial** (Many-to-Many through ProductMaterial)

---

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Create product |
| `PUT` | `/api/products/{id}` | Update product |
| `DELETE` | `/api/products/{id}` | Delete product |

**Example Request (Create Product):**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "P001",
    "name": "Product 1",
    "price": 150.00,
    "materials": [
      {
        "rawMaterialId": 1,
        "quantityRequired": 10
      }
    ]
  }'
```

### Raw Materials

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/raw-materials` | List all raw materials |
| `GET` | `/api/raw-materials/{id}` | Get raw material by ID |
| `POST` | `/api/raw-materials` | Create raw material |
| `PUT` | `/api/raw-materials/{id}` | Update raw material |
| `DELETE` | `/api/raw-materials/{id}` | Delete raw material |

**Example Request (Create Raw Material):**
```bash
curl -X POST http://localhost:8080/api/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "code": "RM001",
    "name": "Steel",
    "stockQuantity": 1000
  }'
```

### Production

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/production/calculate` | Calculate production capacity |

**Example Response:**
```json
{
  "totalProducts": 5,
  "productsWithMaterials": 3,
  "productsWithoutMaterials": 2,
  "totalProductionValue": 4500.00,
  "products": [
    {
      "id": 1,
      "code": "P001",
      "name": "Product 1",
      "price": 150.00,
      "canProduce": true,
      "maxQuantity": 10,
      "quantityToProduce": 10,
      "productionValue": 1500.00,
      "materials": [...]
    }
  ]
}
```

---

## 🧪 Testing

### Backend Tests (JUnit 5)

```bash
cd backend

# Run all tests
./mvnw test

# Run with coverage
./mvnw verify

# Run specific test class
./mvnw test -Dtest=ProductResourceTest
```

**Test Coverage:**
- ✅ Entity tests
- ✅ Repository tests
- ✅ Service tests
- ✅ REST API tests
- ✅ Integration tests

### Frontend Tests (Jest + React Testing Library)

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage --watchAll=false

# Run specific test file
npm test ProductsList.test.js

# Update snapshots
npm test -- -u
```

**Test Coverage (100+ tests):**
- ✅ Component tests (ProductsList, ProductForm, RawMaterialsList, RawMaterialForm, Production, Home, Navbar, App)
- ✅ Redux slice tests (productsSlice, rawMaterialsSlice, productionSlice)
- ✅ Selector tests (memoized selectors)
- ✅ Integration tests

**Coverage Threshold: 50%** for statements, branches, lines, and functions

### E2E Tests (Cypress)

```bash
cd frontend

# Interactive mode
npm run cypress:open

# Headless mode
npm run cypress:run

# Specific spec file
npx cypress run --spec "cypress/e2e/products.cy.js"
```

**E2E Test Scenarios:**
- ✅ Product CRUD flow
- ✅ Raw material CRUD flow
- ✅ Production calculation
- ✅ Navigation flow
- ✅ Error handling

---

## ⚙️ CI/CD

This project includes comprehensive GitHub Actions workflows:

### Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Backend CI** | Push/PR to `api`, `develop`, `main` | Build and test backend |
| **Frontend CI** | Push/PR to `develop`, `main` | Build and test frontend |
| **E2E Tests** | Push/PR to `develop`, `main` | Run Cypress tests |
| **Code Quality** | Push/PR to `develop`, `main` | SonarCloud analysis |
| **Docker Build** | Push to `main` | Build and scan Docker images |
| **Full CI/CD** | Push to `main` | Complete deployment pipeline |

### CI/CD Features

- ✅ Automated testing on every push
- ✅ Code quality analysis with SonarCloud
- ✅ Security scanning with CodeQL
- ✅ Docker image building and scanning
- ✅ Test coverage reporting
- ✅ Artifact uploads (build outputs, test reports, screenshots)
- ✅ Dependabot for dependency updates

See [docs/CI_CD.md](docs/CI_CD.md) for detailed documentation.

---

## 📚 Documentation

### Available Documentation

1. **[README.md](README.md)** - Project overview (you are here)
2. **[docs/QUICKSTART.md](docs/QUICKSTART.md)** - 5-minute setup guide
3. **[docs/TECHNICAL_SUMMARY.md](docs/TECHNICAL_SUMMARY.md)** - Detailed technical documentation
4. **[docs/PRESENTATION.md](docs/PRESENTATION.md)** - Presentation-ready summary
5. **[docs/FILE_INDEX.md](docs/FILE_INDEX.md)** - Complete file reference
6. **[docs/CI_CD.md](docs/CI_CD.md)** - CI/CD workflows documentation
7. **[docs/architecture-diagram.drawio](docs/architecture-diagram.drawio)** - Architecture diagram (open with draw.io)
8. **[backend/README.md](backend/README.md)** - Backend specific documentation
9. **[frontend/README.md](frontend/README.md)** - Frontend specific documentation
10. **Swagger UI** - Interactive API docs at http://localhost:8080/swagger-ui

---

## 🎯 Production Calculation Logic

The system calculates which products can be produced based on:

1. **Stock Availability**: Checks if all required raw materials are available
2. **Quantity Calculation**: Determines maximum producible quantity for each product
3. **Value Prioritization**: Prioritizes products by highest value first
4. **Stock Allocation**: Allocates stock to higher value products before lower value ones
5. **Total Value**: Calculates total production value

**Algorithm:**
```
FOR each product (sorted by price DESC):
  IF product has no materials:
    SKIP (cannot calculate without materials)
  ELSE:
    FOR each material requirement:
      maxQty = FLOOR(materialStock / quantityRequired)
      minQty = MIN(minQty, maxQty)
    
    product.maxQuantity = minQty
    
    IF minQty > 0:
      product.canProduce = true
      product.quantityToProduce = minQty
      product.productionValue = minQty * price
      
      // Allocate stock
      FOR each material:
        materialStock -= (quantityRequired * minQty)
```

---

## 🔧 Environment Variables

### Backend (application.properties)

```properties
# Database
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=postgres
quarkus.datasource.password=postgres
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5433/inventory_db

# Hibernate
quarkus.hibernate-orm.database.generation=drop-and-create
quarkus.hibernate-orm.sql-load-script=import.sql

# HTTP
quarkus.http.port=8080
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:3000

# Swagger
quarkus.swagger-ui.always-include=true
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:8080
PORT=3000
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**2. Database connection failed**
```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check database
docker exec -it inventory-postgres psql -U postgres -d inventory_db
```

**3. npm install fails**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**4. Maven build fails**
```bash
# Clear repository
rm -rf ~/.m2/repository
mvn clean install -U
```

**5. Docker build fails**
```bash
# Remove all containers and rebuild
docker-compose down -v
docker system prune -a
docker-compose up --build -d
```

---

## 📄 License

This project was developed as a technical assessment for a fullstack developer position.

---

## 👨‍💻 Author

**Geovanni Souza**

- GitHub: [@Geovannisouza23](https://github.com/Geovannisouza23)
- Repository: [manufacturing-inventory-system](https://github.com/Geovannisouza23/manufacturing-inventory-system)

---

## 🙏 Acknowledgments

Developed following industry best practices:
- Clean Code Architecture
- SOLID Principles
- RESTful API Design
- Modern Frontend Patterns
- Comprehensive Testing
- CI/CD Best Practices

---

<p align="center">
  Made with ❤️ using Quarkus + React
</p>

│   │   │   │   └── service/       # Business Logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                  # JUnit Tests
│   ├── pom.xml
│   └── README.md
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable Components
│   │   ├── pages/          # Page Components
│   │   ├── services/       # API Services
│   │   ├── store/          # Redux Store
│   │   │   └── slices/     # Redux Slices
│   │   └── __tests__/      # Jest Tests
│   ├── cypress/            # Cypress E2E Tests
│   │   └── e2e/
│   ├── package.json
│   └── README.md
│
├── docs/                   # Documentation
│   ├── QUICKSTART.md       # Quick start guide
│   ├── TECHNICAL_SUMMARY.md # Technical documentation
│   ├── PRESENTATION.md     # Presentation summary
│   ├── FILE_INDEX.md       # Complete file index
│   └── verify-setup.sh     # Setup verification script
│
├── README.md               # Main documentation
└── docker-compose.yml      # Docker deployment
```

## 🗄️ Database Schema

### Tables

**products**
- id (PK)
- code (unique)
- name
- value

**raw_materials**
- id (PK)
- code (unique)
- name
- stock_quantity

**product_materials**
- id (PK)
- product_id (FK)
- raw_material_id (FK)
- quantity_required

## 🔌 API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Raw Materials
- `GET /api/raw-materials` - List all raw materials
- `GET /api/raw-materials/{id}` - Get raw material by ID
- `POST /api/raw-materials` - Create raw material
- `PUT /api/raw-materials/{id}` - Update raw material
- `DELETE /api/raw-materials/{id}` - Delete raw material

### Production
- `GET /api/production/calculate` - Calculate producible products

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Unit Tests
```bash
cd frontend
npm test
```

### Frontend E2E Tests (Cypress)
```bash
cd frontend
npm run cypress:open  # Interactive mode
npm run cypress:run   # Headless mode
```

## 🎯 Production Calculation Logic

The system calculates which products can be produced based on:

1. **Stock Availability**: Checks if all required raw materials are available
2. **Quantity Calculation**: Determines maximum producible quantity for each product
3. **Value Prioritization**: Prioritizes products by highest value first
4. **Stock Allocation**: Allocates stock to higher value products before lower value ones
5. **Total Value**: Calculates total production value

## 🎨 UI Features

- Responsive design (mobile, tablet, desktop)
- Intuitive navigation
- Real-time form validation
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Clean and modern interface

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🛠️ Technologies Used

### Backend
- Java 17
- Quarkus 3.6.4
- Hibernate ORM with Panache
- RESTEasy Reactive
- PostgreSQL
- JUnit 5
- Rest Assured

### Frontend
- React 18
- Redux Toolkit
- React Router 6
- Axios
- Jest & React Testing Library
- Cypress

## 📄 License

This project was developed as a technical assessment for a fullstack developer position.

## 👥 Author

Developed following industry best practices and requirements for a junior fullstack developer position focusing on:
- Modern web development
- Clean code architecture
- Comprehensive testing
- API design
- Responsive UI/UX
- Database modeling

---

## � CI/CD

This project includes comprehensive GitHub Actions workflows for continuous integration and deployment:

- ✅ **Backend CI** - Automated testing and building
- ✅ **Frontend CI** - Automated testing and building  
- ✅ **E2E Tests** - Cypress integration tests
- ✅ **Docker Build** - Container images with security scanning
- ✅ **Code Quality** - SonarCloud and CodeQL analysis
- ✅ **Dependabot** - Automatic dependency updates

See [docs/CI_CD.md](docs/CI_CD.md) for detailed documentation.

## 📚 Documentation

### Available Documentation
1. **README.md** - Project overview (you are here)
2. **[docs/QUICKSTART.md](docs/QUICKSTART.md)** - 5-minute setup guide
3. **[docs/TECHNICAL_SUMMARY.md](docs/TECHNICAL_SUMMARY.md)** - Detailed technical doc
4. **[docs/PRESENTATION.md](docs/PRESENTATION.md)** - Presentation-ready summary
5. **[docs/FILE_INDEX.md](docs/FILE_INDEX.md)** - Complete file reference
6. **[docs/CI_CD.md](docs/CI_CD.md)** - CI/CD workflows documentation
7. **[backend/README.md](backend/README.md)** - Backend specific documentation
8. **[frontend/README.md](frontend/README.md)** - Frontend specific documentation
9. **Swagger UI** - Interactive API docs at http://localhost:8080/swagger-ui
# Test
