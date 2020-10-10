const express = require('express');
const router = express.Router();

const productModel = require('../model/product')


// product 생성
router.post('/', (req, res) => {

  const newProduct = new productModel({
    name : req.body.productName,
    price : req.body.productPrice
  })

  newProduct
    .save()
    .then(doc => {
      res.json({
        message : 'saved product',
        productInfo : doc
      })
    })
    .catch(err => {
      res.json(err)
    })
})

// product get total
router.get('/', (req, res) => {

  productModel
    .find()
    .then(docs => {
      if (docs.length === 0) {
        return res.json({
          message : 'empty products'
        })
      }

      res.json({
        count : docs.length,
        results : docs.map(doc => {
          return {
            id : doc._id,
            name : doc.name,
            price : doc.price,
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })

  // res.json({
  //   message : 'product get data'
  // })
})

// detail Get
router.get('/:productId', (req, res) => {
  const id = req.params.productId
  productModel
    .findById(id)
    .then(doc => {
      res.json({
        message : 'product get from ' + doc._id,
        result : {
          id : doc._id,
          name : doc.name,
          price : doc.price,
        }
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// product update
router.patch('/:productId', (req, res) => {

  const id = req.params.productId
  const updateOps = {}

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }


  productModel
    .findByIdAndUpdate(id, { $set : updateOps })
    .then(() => {
      res.json({
        message : 'updated product at ' + id
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// product delete all
router.delete('/', (req, res) => {
  // 전체 삭제
  productModel
    .remove()
    .then(() => {
      res.json({
        message : 'product all deleted'
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// product delete by id
router.delete('/:productId', (req, res) => {
  const productId = req.params.productId
  productModel
    .findByIdAndDelete(productId)
    .then(() => {
      res.json({
        message : 'product deleted'
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


module.exports = router