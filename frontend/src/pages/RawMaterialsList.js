import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRawMaterials, deleteRawMaterial } from '../store/slices/rawMaterialsSlice';
import { useNavigate } from 'react-router-dom';

function RawMaterialsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: materials = [], loading = false, error = null } = useSelector((state) => state.rawMaterials || {});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (deleteConfirm === id) {
      await dispatch(deleteRawMaterial(id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (loading) return <div className="loading">Loading raw materials...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Raw Materials</h2>
          <button className="btn btn-success" onClick={() => navigate('/raw-materials/new')}>
            Add New Material
          </button>
        </div>

        {error && <div className="error">Error: {error}</div>}

        {materials.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
            No raw materials found. Click "Add New Material" to create one.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Stock Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td>{material.code}</td>
                    <td>{material.name}</td>
                    <td>{material.stockQuantity}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary"
                          onClick={() => navigate(`/raw-materials/edit/${material.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className={deleteConfirm === material.id ? 'btn btn-danger' : 'btn btn-secondary'}
                          onClick={() => handleDelete(material.id)}
                        >
                          {deleteConfirm === material.id ? 'Confirm?' : 'Delete'}
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

export default RawMaterialsList;
