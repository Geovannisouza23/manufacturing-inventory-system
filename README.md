# Inventory Management System

A fullstack web application for managing industrial inventory, products, raw materials, and production planning.

## 📋 Project Overview

This system was developed to help industries control inventory of raw materials needed for production. It allows managing products and raw materials, associating materials with products, and calculating which products can be produced based on available stock.

## 🏗️ Architecture

The project follows a modern fullstack architecture:

- **Backend**: Java + Quarkus (REST API)
- **Frontend**: React + Redux (SPA)
- **Database**: PostgreSQL
- **Testing**: JUnit, Jest, Cypress

## ✨ Features

### Functional Requirements

✅ **RF001** - Backend CRUD for products  
✅ **RF002** - Backend CRUD for raw materials  
✅ **RF003** - Backend CRUD for product-material associations  
✅ **RF004** - Backend production calculation endpoint  
✅ **RF005** - Frontend interface for products CRUD  
✅ **RF006** - Frontend interface for raw materials CRUD  
✅ **RF007** - Frontend interface for product-material associations  
✅ **RF008** - Frontend interface for production calculation  

### Non-Functional Requirements

✅ **RNF001** - Web platform (Chrome, Firefox, Edge compatible)  
✅ **RNF002** - API-based architecture (Backend/Frontend separation)  
✅ **RNF003** - Responsive design  
✅ **RNF004** - PostgreSQL database  
✅ **RNF005** - Quarkus framework for backend  
✅ **RNF006** - React + Redux for frontend  
✅ **RNF007** - English language for all code  

### Additional Features

✅ Unit tests for backend (JUnit)  
✅ Unit tests for frontend (Jest + React Testing Library)  
✅ Integration tests (Cypress)  

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.8+
- npm or yarn

### 1. Database Setup

```bash
# Using Docker
docker run -d --name inventory-postgres \
  -e POSTGRES_DB=inventory_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine
```

### 2. Backend Setup

```bash
cd backend
./mvnw quarkus:dev
```

Backend will be available at http://localhost:8080  
Swagger UI at http://localhost:8080/swagger-ui

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will be available at http://localhost:3000

## 📁 Project Structure

```
fullstack.test/
├── backend/                # Quarkus Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/inventory/
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── entity/        # JPA Entities
│   │   │   │   ├── repository/    # Panache Repositories
│   │   │   │   ├── resource/      # REST Controllers
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
