import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import ProductForm from './pages/ProductForm';
import RawMaterialsList from './pages/RawMaterialsList';
import RawMaterialForm from './pages/RawMaterialForm';
import Production from './pages/Production';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/raw-materials" element={<RawMaterialsList />} />
            <Route path="/raw-materials/new" element={<RawMaterialForm />} />
            <Route path="/raw-materials/edit/:id" element={<RawMaterialForm />} />
            <Route path="/production" element={<Production />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
