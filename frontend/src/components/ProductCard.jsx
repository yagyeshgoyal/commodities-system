import { Link } from 'react-router-dom';
import { Package, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProductCard = ({ product, onDelete }) => {
  const { hasRole, hasAnyRole } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Low Stock':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Out of Stock':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="card animate-fadeIn">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
            <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {product.category}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            product.status
          )}`}
        >
          {product.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {product.quantity} {product.unit}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Price:</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            ${product.price}
          </span>
        </div>
        {product.supplier && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Supplier:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {product.supplier}
            </span>
          </div>
        )}
      </div>

      {product.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>
      )}

      {/* Action buttons - role-based */}
      {hasAnyRole(['Manager', 'Store Keeper']) && (
        <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link to={`/products/edit/${product._id}`} className="flex-1">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </Link>
          {hasRole('Manager') && (
            <button
              onClick={() => onDelete(product._id)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;