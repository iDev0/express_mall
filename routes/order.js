const express = require('express');
const router = express.Router();
const orderModel = require('../model/order')
const checkAuth = require('../middleware/check_auth')



// order register
router.post('/', checkAuth, (req, res) => {

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

// order read
router.get('/', checkAuth, (req, res) => {
  orderModel
    .find()
    .populate('product', ["name", "price"])
    .then(items => {
      console.log(items)
      // if (items.length === 0) {
      //   res.json({
      //     message : 'order is Empty'
      //   })
      //   return
      // }


      res.json({
        message : 'order get...',
        orderInfo : items.map(item => {
          return {
            id : item._id,
            quantity : item.quantity,
            product : item.product,
            request : {
              type : 'GET',
              url : 'http://localhost:5000/order/' + item._id
            }
          }
        }),
        // orderInfo : items.map(item => {
        //   return {
        //     id : item._id,
        //     product: {
        //       id : item.product._id,
        //       name : item.product.name,
        //       price : item.product.price,
        //     },
        //     quantity: item.quantity
        //   }
        // })
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
// order modify
router.patch('/:orderId', checkAuth, (req, res) => {
  const id = req.params.orderId
  const updateOrderInfo = {}

  for (const info of req.body) {
    updateOrderInfo[info.propName] = info.value
  }

  orderModel
    .findByIdAndUpdate(id, { $set : updateOrderInfo })
    .then(() => {
      res.json({
        message : 'updated order at' + id,
        request : {
          type : 'GET',
          url : 'http://localhost:5000/order' + id
        }
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// order remove
router.delete('/:orderId', checkAuth, (req, res) => {
  const orderId = req.params.orderId
  orderModel
    .findByIdAndDelete(orderId)
    .then(() => {
      res.json({
        message : 'order remove'
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })

})

// order remove all
router.delete('/', checkAuth, (req, res) => {
  orderModel
    .remove()
    .then(() => {
      res.json({
        message : 'order all removed..'
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})





module.exports = router