const express = require('express');
const router = express.Router();

const orderModel = require('../model/order')
const productModel = require('../model/product')


// order register
router.post('/', (req, res) => {

  const order = new orderModel({
    product : req.body.productId,
    quantity : req.body.qty
  })

  order
    .save()
    .then(item => {
      res.json({
        message : 'order add...',
        orderInfo : {
          id : item._id,
          product : item.product,
          quantity : item.quantity
        }
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })


})

const getProduct = productId => {
  productModel
    .findById(productId)
    .then(result => {
      console.log(result)
      return result
    })
    .catch(err => {
      throw err
    })
}

// order read
router.get('/', (req, res) => {
  orderModel
    .find()
    .populate('product')
    .then(items => {
      res.json({
        message : 'order get...',
        orderInfo : items.map(item => {
          return {
            id : item._id,
            product: {
              id : item.product._id,
              name : item.product.name,
              price : item.product.price,
            },
            quantity: item.quantity
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
// order modify
router.patch('/', (req, res) => {
  res.json({
    message : 'order patch'
  })
})
// order remove
router.delete('/', (req, res) => {
  res.json({
    message : 'order delete'
  })
})





module.exports = router