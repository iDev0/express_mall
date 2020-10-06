const mongoose = require('mongoose');
const Keys = require('./Keys')
// database connection
const dbOptions = {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useFindAndModify : false
}
mongoose
  .connect(process.env.MONGDB_ADDRESS, dbOptions)
  .then(() => {
    console.log('db connected...')
  })
  .catch((err) => {
    console.log(err.message)
  })