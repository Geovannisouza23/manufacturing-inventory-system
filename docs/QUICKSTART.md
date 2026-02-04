# Quick Start Guide - Inventory Management System

## 🚀 Getting Started in 5 Minutes

### Option 1: Manual Setup (Recommended for Development)

#### Step 1: Start the Database
```bash
docker run -d --name inventory-postgres \
  -e POSTGRES_DB=inventory_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine
```

#### Step 2: Start the Backend
Open a new terminal:
```bash
cd backend
./mvnw quarkus:dev
```
✅ Backend running at http://localhost:8080  
✅ Swagger UI at http://localhost:8080/swagger-ui

#### Step 3: Start the Frontend
Open another terminal:
```bash
cd frontend
npm install
npm start
```
✅ Frontend running at http://localhost:3000

### Option 2: Docker Compose (Full Stack)

```bash
docker-compose up -d
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui

## 📝 First Steps

### 1. Create Raw Materials
1. Navigate to "Raw Materials" in the menu
2. Click "Add New Material"
3. Example:
   - Code: STEEL001
   - Name: Steel Sheet
   - Stock Quantity: 1000

### 2. Create Products
1. Navigate to "Products"
2. Click "Add New Product"
3. Example:
   - Code: PROD001
   - Name: Metal Box
   - Value: 150.00
   - Add materials: Select STEEL001, Quantity: 5

### 3. View Production Report
1. Navigate to "Production"
2. See which products can be produced
3. View total production value

## 🧪 Running Tests

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

### E2E Tests (Cypress)
Make sure both backend and frontend are running:
```bash
cd frontend
npm run cypress:open
```

## 📚 API Examples

### Create a Product
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD001",
    "name": "Test Product",
    "value": 100.00,
    "materials": []
  }'
```

### Create a Raw Material
```bash
curl -X POST http://localhost:8080/api/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT001",
    "name": "Test Material",
    "stockQuantity": 500
  }'
```

### Calculate Production
```bash
curl http://localhost:8080/api/production/calculate
```

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running: `docker ps`
- Check if port 8080 is available: `lsof -i :8080`
- Verify Java 17+ is installed: `java -version`

### Frontend won't start
- Check if port 3000 is available: `lsof -i :3000`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node -v` (should be 16+)

### Database connection error
- Verify PostgreSQL is running
- Check credentials in `backend/src/main/resources/application.properties`
- Test connection: `psql -h localhost -U postgres -d inventory_db`

## 📖 Next Steps

1. Read the full [README.md](README.md) for detailed information
2. Explore the [Backend Documentation](backend/README.md)
3. Check out the [Frontend Documentation](frontend/README.md)
4. Review the API documentation in Swagger UI

## 💡 Tips

- Use Swagger UI to test the API endpoints interactively
- The database is recreated on each backend restart (dev mode)
- Frontend auto-reloads on code changes
- Backend supports live reload with Quarkus dev mode
- Check browser console for frontend errors
- Check backend logs for API errors

## 🎯 Key Features to Test

1. ✅ Create products and raw materials
2. ✅ Associate materials with products
3. ✅ Update stock quantities
4. ✅ View production calculations
5. ✅ Responsive design (try different screen sizes)
6. ✅ CRUD operations for all entities

Enjoy using the Inventory Management System! 🎉
