const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const app = express()
let port = process.env.PORT || 8000
require('dotenv').config()
//=================================================================
//                         Middllwares
//=================================================================
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//=================================================================
//                          Routes
//=================================================================
const userRouter = require('./Routes/userRouter')
const storeRoutes = require('./Routes/storeRoutes')
const catergoryRoutes = require('./Routes/catergoryRoutes')
const productRouter = require('./Routes/productRouter')
const paymentRouter = require('./Routes/paymentRouter')
const cartRouter = require('./Routes/cartRouter')
const sellerBankAccountRoutes = require('./Routes/sellerBankAccountRoutes')

app.use('/api/v1/user', userRouter)
app.use('/api/v1/store', storeRoutes)
app.use('/api/v1/catergory', catergoryRoutes)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/bankdetails', sellerBankAccountRoutes)

//=================================================================
//                         Server
//=================================================================
app.listen(port, () => {
  console.log(`server is running port ${port} `)
})
