import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { productsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'pcs',
    price: '',
    supplier: '',
    description: '',
    reorderLevel: '10',
  });

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getOne(id);
      const product = response.data.data;
      setFormData({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        unit: product.unit,
        price: product.price,
        supplier: product.supplier || '',
        description: product.description || '',
        reorderLevel: product.reorderLevel,
      });
    } catch (error) {
      setError('Failed to load product');
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        reorderLevel: Number(formData.reorderLevel),
      };

      if (isEditMode) {
        await productsAPI.update(id, productData);
      } else {
        await productsAPI.create(productData);
      }
      navigate('/products');
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? 'update' : 'create'} product`
      );
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="animate-fadeIn max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isEditMode
                  ? 'Update product information'
                  : 'Add a new commodity to your inventory'}
              </p>
            </div>

            <div className="card">
              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div>
                    <label className="label">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., Rice Bags"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="label">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., Grains"
                      required
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="label">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="0"
                      min="0"
                      step="any"
                      required
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="label">Unit *</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="g">Grams</option>
                      <option value="L">Liters</option>
                      <option value="mL">Milliliters</option>
                      <option value="box">Boxes</option>
                      <option value="ton">Tons</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="label">Price per Unit ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  {/* Reorder Level */}
                  <div>
                    <label className="label">Reorder Level</label>
                    <input
                      type="number"
                      name="reorderLevel"
                      value={formData.reorderLevel}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="10"
                      min="0"
                    />
                  </div>
                </div>

                {/* Supplier */}
                <div>
                  <label className="label">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., ABC Distributors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field"
                    rows="4"
                    placeholder="Additional details about the product..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>
                      {loading
                        ? isEditMode
                          ? 'Saving...'
                          : 'Creating...'
                        : isEditMode
                        ? 'Save Changes'
                        : 'Create Product'}
                    </span>
                  </button>
                  <Link to="/products">
                    <button
                      type="button"
                      className="px-8 py-3 btn-secondary flex items-center space-x-2"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEditProduct;