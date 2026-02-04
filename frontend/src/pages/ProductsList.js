import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/slices/productsSlice';
import { selectProductsItems, selectProductsLoading, selectProductsError } from '../store/selectors';
import { useNavigate } from 'react-router-dom';

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProductsItems);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (deleteConfirm === id) {
      await dispatch(deleteProduct(id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Products</h2>
          <button className="btn btn-primary" onClick={() => navigate('/products/new')}>
            Add New Product
          </button>
        </div>

        {error && <div className="error">Error: {error}</div>}

        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
            No products found. Click "Add New Product" to create one.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Materials</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>${product.price?.toFixed(2)}</td>
                    <td>{product.materials?.length || 0} material(s)</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary"
                          onClick={() => navigate(`/products/edit/${product.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className={deleteConfirm === product.id ? 'btn btn-danger' : 'btn btn-secondary'}
                          onClick={() => handleDelete(product.id)}
                        >
                          {deleteConfirm === product.id ? 'Confirm?' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;
