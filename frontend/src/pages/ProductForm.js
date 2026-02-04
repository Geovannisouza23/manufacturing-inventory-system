import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, fetchProducts } from '../store/slices/productsSlice';
import { fetchRawMaterials } from '../store/slices/rawMaterialsSlice';

function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products = [] } = useSelector((state) => state.products || {});
  const { items: rawMaterials = [] } = useSelector((state) => state.rawMaterials || {});

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    price: '',
    materials: [],
  });

  const [newMaterial, setNewMaterial] = useState({
    rawMaterialId: '',
    quantityRequired: '',
  });

  useEffect(() => {
    dispatch(fetchRawMaterials());
    if (id) {
      dispatch(fetchProducts());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        setFormData({
          code: product.code,
          name: product.name,
          price: product.price,
          materials: product.materials || [],
        });
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.rawMaterialId && newMaterial.quantityRequired) {
      const material = rawMaterials.find((m) => m.id === parseInt(newMaterial.rawMaterialId));
      if (material) {
        const materialData = {
          rawMaterialId: material.id,
          rawMaterialCode: material.code,
          rawMaterialName: material.name,
          quantityRequired: parseInt(newMaterial.quantityRequired),
        };
        setFormData((prev) => ({
          ...prev,
          materials: [...prev.materials, materialData],
        }));
        setNewMaterial({ rawMaterialId: '', quantityRequired: '' });
      }
    }
  };

  const handleRemoveMaterial = (index) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (id) {
      await dispatch(updateProduct({ id: parseInt(id), product: productData }));
    } else {
      await dispatch(createProduct(productData));
    }
    navigate('/products');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{id ? 'Edit Product' : 'New Product'}</h2>
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
            <label>Price *</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Raw Materials</label>
            {formData.materials.length > 0 && (
              <div className="material-list">
                {formData.materials.map((material, index) => (
                  <div key={index} className="material-item">
                    <span>
                      {material.rawMaterialName} - Quantity: {material.quantityRequired}
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveMaterial(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="add-material-form">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Select Material</label>
                <select
                  value={newMaterial.rawMaterialId}
                  onChange={(e) =>
                    setNewMaterial((prev) => ({ ...prev, rawMaterialId: e.target.value }))
                  }
                >
                  <option value="">Select a raw material</option>
                  {rawMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.code} - {material.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Quantity Required</label>
                <input
                  type="number"
                  min="1"
                  value={newMaterial.quantityRequired}
                  onChange={(e) =>
                    setNewMaterial((prev) => ({ ...prev, quantityRequired: e.target.value }))
                  }
                />
              </div>

              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddMaterial}
                disabled={!newMaterial.rawMaterialId || !newMaterial.quantityRequired}
              >
                Add Material
              </button>
            </div>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Create'} Product
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
