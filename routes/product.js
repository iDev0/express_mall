const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth')
const {
  products_get_all,
  products_get_product,
  products_post_product,
  products_update_product,
  products_delete_all,
  products_delete_product
} = require('../controllers/product')

// product 생성
router.post('/', checkAuth, products_post_product)

// product get total
router.get('/', products_get_all)

// detail Get
router.get('/:productId', checkAuth, products_get_product)


// product update
router.patch('/:productId', checkAuth, products_update_product)

// product delete all
router.delete('/', checkAuth, products_delete_all)

// product delete by id
router.delete('/:productId', checkAuth, products_delete_product)


module.exports = router