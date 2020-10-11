const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "jungjuyoung")
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(408).json({
      message : 'auth failed...'
    })
  }
}