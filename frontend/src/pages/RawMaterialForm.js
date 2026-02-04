import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createRawMaterial, updateRawMaterial, fetchRawMaterials } from '../store/slices/rawMaterialsSlice';

function RawMaterialForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: materials } = useSelector((state) => state.rawMaterials);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    stockQuantity: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchRawMaterials());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && materials.length > 0) {
      const material = materials.find((m) => m.id === parseInt(id));
      if (material) {
        setFormData({
          code: material.code,
          name: material.name,
          stockQuantity: material.stockQuantity,
        });
      }
    }
  }, [id, materials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const materialData = {
      ...formData,
      stockQuantity: parseInt(formData.stockQuantity),
    };

    if (id) {
      await dispatch(updateRawMaterial({ id: parseInt(id), material: materialData }));
    } else {
      await dispatch(createRawMaterial(materialData));
    }
    navigate('/raw-materials');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{id ? 'Edit Raw Material' : 'New Raw Material'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Code *</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity *</label>
            <input
              type="number"
              min="0"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-success">
              {id ? 'Update' : 'Create'} Material
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/raw-materials')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RawMaterialForm;
