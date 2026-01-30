const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// Statistics route (Manager only)
router.get('/stats', protect, authorize('Manager'), getProductStats);

// Product CRUD routes
router
  .route('/')
  .get(protect, getProducts)
  .post(protect, authorize('Manager', 'Store Keeper'), createProduct);

router
  .route('/:id')
  .get(protect, getProduct)
  .put(protect, authorize('Manager', 'Store Keeper'), updateProduct)
  .delete(protect, authorize('Manager'), deleteProduct);

module.exports = router;