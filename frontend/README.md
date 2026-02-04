# Inventory Management System - Frontend

## Technologies
- React 18
- Redux Toolkit
- React Router 6
- Axios
- Cypress (E2E Testing)
- Jest & React Testing Library (Unit Testing)

## Prerequisites
- Node.js 16+
- npm or yarn

## Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Edit `.env` file if needed:
```
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Run Application

#### Development mode:
```bash
npm start
```

The application will be available at http://localhost:3000

#### Production build:
```bash
npm run build
```

## Testing

### Unit Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

### E2E Tests with Cypress
Make sure the backend is running on port 8080 and frontend on port 3000.

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

## Application Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/       # Reusable components
│   │   └── Navbar.js
│   ├── pages/            # Page components
│   │   ├── Home.js
│   │   ├── ProductsList.js
│   │   ├── ProductForm.js
│   │   ├── RawMaterialsList.js
│   │   ├── RawMaterialForm.js
│   │   └── Production.js
│   ├── services/         # API services
│   │   └── api.js
│   ├── store/            # Redux store
│   │   ├── index.js
│   │   └── slices/
│   │       ├── productsSlice.js
│   │       ├── rawMaterialsSlice.js
│   │       └── productionSlice.js
│   ├── __tests__/        # Unit tests
│   ├── App.js
│   ├── index.js
│   └── index.css
├── cypress/              # E2E tests
│   ├── e2e/
│   │   ├── products.cy.js
│   │   ├── raw-materials.cy.js
│   │   ├── production.cy.js
│   │   └── navigation.cy.js
│   └── support/
└── package.json
```

## Features

### Products Management (RF005)
- List all products
- Create new products
- Edit existing products
- Delete products
- Associate raw materials with products (RF007)

### Raw Materials Management (RF006)
- List all raw materials
- Create new raw materials
- Edit existing raw materials
- Delete raw materials
- Track stock quantities

### Production Calculation (RF008)
- View producible products based on stock
- See maximum quantities for each product
- View total production value
- Products prioritized by value

## Responsive Design (RNF003)
The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Browser Compatibility (RNF001)
Tested and compatible with:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

## Redux Store Structure

### Products Slice
```javascript
{
  items: [],       // Array of products
  loading: false,  // Loading state
  error: null      // Error message
}
```

### Raw Materials Slice
```javascript
{
  items: [],       // Array of raw materials
  loading: false,  // Loading state
  error: null      // Error message
}
```

### Production Slice
```javascript
{
  report: null,    // Production report object
  loading: false,  // Loading state
  error: null      // Error message
}
```

## API Integration
All API calls are made through the `services/api.js` file using Axios. The API base URL is configured via environment variable.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:run` - Run Cypress tests headlessly
