const express = require('express')
require('dotenv').config()
require('./Database/connection')
const morgan = require('morgan')
const cors = require('cors')

// const TestRoute = require('./Routes/testRoute')
const CategoryRoute = require('./Routes/categoryRoute')
const ProductRoute =require('./Routes/productRoute')
const UserRoute = require('./Routes/userRoute')
const orderRoute = require('./Routes/orderRoute')


const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(morgan('dev'))
app .use(cors())
// app.use(TestRoute)
app.use(CategoryRoute)
app.use(ProductRoute)
app.use(UserRoute)
app.use(orderRoute)


app.listen(port, () => {
    console.log(`App started at port ${port}`)
})