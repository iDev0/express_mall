const productModel = require('../model/product')

exports.products_get_all = (req, res) => {

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
};

exports.products_get_product = (req, res) => {
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
};

exports.products_post_product = (req, res) => {

  const { name, price } = req.body

  const newProduct = new productModel({
    name,
    price
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
};

exports.products_update_product = (req, res) => {

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
};

exports.products_delete_all = (req, res) => {
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
};

exports.products_delete_product = (req, res) => {
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
};