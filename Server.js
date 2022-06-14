const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')

const app = express()
let port = process.env.PORT || 8000

// Middleware
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

const paymentRouter = require('./Routes/paymentRouter')
const cartRouter = require('./Routes/cartRouter')

//routes
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/cart', cartRouter)

//server
app.listen(port, () => {
  console.log(`server is running port ${port} `)
})
