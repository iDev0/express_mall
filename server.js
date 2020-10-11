const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const app = express()

dotEnv.config()

const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')

require('./config/database')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/user', userRouter)

const port = process.env.PORT || 7000
app.listen(port, console.log(`server started... at ${port}`))