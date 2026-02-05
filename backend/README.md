# Inventory Management System - Backend

## Technologies
- Java 17
- Quarkus 3.6.4
- PostgreSQL
- Hibernate ORM with Panache
- RESTEasy Reactive
- JUnit 5

## Prerequisites
- Java 17+
- Maven 3.8+
- PostgreSQL 12+ (or use Docker)

## Setup

### 1. Database Setup

#### Using Docker:
```bash
docker run -d --name inventory-postgres \
  -e POSTGRES_DB=inventory_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine
```

#### Or build from Dockerfile:
```bash
cd backend
docker build -f Dockerfile.postgres -t inventory-postgres .
docker run -d --name inventory-postgres -p 5432:5432 inventory-postgres
```

### 2. Run Application

#### Development mode:
```bash
cd backend
./mvnw quarkus:dev
```

The application will be available at:
- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui

#### Production mode:
```bash
./mvnw clean package
java -jar target/quarkus-app/quarkus-run.jar
```

### 3. Run Tests
```bash
./mvnw test
```

## API Endpoints

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

### Production Calculation
- `GET /api/production/calculate` - Calculate producible products

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/inventory/
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── entity/        # JPA Entities
│   │   │   ├── repository/    # Panache Repositories
│   │   │   ├── resource/      # REST Controllers
│   │   │   └── service/       # Business Logic
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/inventory/
│           ├── resource/      # Integration Tests
│           └── service/       # Unit Tests
└── pom.xml
```
