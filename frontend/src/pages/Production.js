import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateProduction } from '../store/slices/productionSlice';

function Production() {
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.production);

  useEffect(() => {
    dispatch(calculateProduction());
  }, [dispatch]);

  const handleRecalculate = () => {
    dispatch(calculateProduction());
  };

  if (loading) return <div className="loading">Calculating production...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Production Report</h2>
          <button className="btn btn-primary" onClick={handleRecalculate}>
            Recalculate
          </button>
        </div>

        {error && <div className="error">Error: {error}</div>}

        {report && (
          <>
            <div className="production-summary">
              <h3>Total Production Value</h3>
              <div className="total-value">${report.totalProductionValue?.toFixed(2)}</div>
              <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
                Based on current stock availability and product prioritization
              </p>
            </div>

            {report.producibleProducts && report.producibleProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
                No products can be produced with current stock levels.
                Please check your raw materials inventory.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Unit Value</th>
                      <th>Max Quantity</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.producibleProducts?.map((product) => (
                      <tr key={product.productId}>
                        <td>{product.productCode}</td>
                        <td>{product.productName}</td>
                        <td>${product.productValue?.toFixed(2)}</td>
                        <td style={{ fontWeight: 'bold', color: '#27ae60' }}>
                          {product.maxQuantity}
                        </td>
                        <td style={{ fontWeight: 'bold', color: '#3498db' }}>
                          ${product.totalValue?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#ecf0f1', borderRadius: '4px' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>About Production Calculation</h4>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                • Products are prioritized by their value (highest first)<br />
                • Quantities are calculated based on available raw material stock<br />
                • Stock is allocated to higher value products first<br />
                • Once a raw material is allocated, it's not available for lower priority products
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Production;
