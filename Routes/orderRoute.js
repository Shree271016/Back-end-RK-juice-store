const express = require('express')
const {placeOrder, getAllOrders, getOrderByUser, getOrderDetails, UpdateOrder} = require('../Controller/orderControler')
const router = express.Router()

router.post('/placeorder',placeOrder)
router.get('/getallorders',getAllOrders)
router.get('/getuserorders/:userId',getOrderByUser)
router.get('/getorderdetails/:id',getOrderDetails)
router.put('/updateorderstatus/:id',UpdateOrder)

module.exports = router