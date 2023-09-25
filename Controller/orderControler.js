const Order = require('../model/OrderModel')
const OrderItems = require('../model/OrderItemsModel')
/*
order_items :[{abc,5},{def,3},{xyz,4}]
street:
alt_street:

.
.
.*/

// insert all the order_item into orderItemsModel ->order_items_id

// place Order
exports.placeOrder = async (req, res) => {
    let order_items_id = await Promise.all(
        req.body.order_items.map(async (orderItem) => {
            let orderItem1 = new OrderItems({
                product: orderItem.product,
                quantity: orderItem.quantity
            })
            orderItem1 = await orderItem1.save()
            if(!orderItem1){
                return res.status(400).json({error:"Something went wrong"})
            }
            return orderItem1._id
        })
    )
    // calculate total_items

    let individual_total = await Promise.all(
        order_items_id.map(async orderItem => {
            let orderItemAdded = await OrderItems.findById(orderItem).populate('product', 'product_price')
            return orderItemAdded.product.product_price * orderItemAdded.quantity
        })
    )
    let total = individual_total.reduce((ac, cu) => ac + cu)
    console.log(total)

    // insert into orders
    let orderToPlace = new Order({
        user: req.body.user,
        orderItems: order_items_id,
        total,
        street: req.body.street,
        alternate_street: req.body.alternate_street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        country: req.body.country,
        phone: req.body.phone
    })
    orderToPlace = await orderToPlace.save()
    if (!orderToPlace) {
        return res.status(400).json({ error: "Failed to place order" })
    }
    res.send(orderToPlace)
}

// get order details
exports.getAllOrders =async (req,res)=>{
    let orders = await Order.find()
    .populate({path:"orderItems",populate:{path:"product",populate:{path:"category"}}})
    .populate('user','username')
    if(!orders){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(orders)
}
// get order details
exports.getOrderDetails =async (req,res)=>{
    let order = await Order.findById(req.params.id)
    .populate({path:"orderItems",populate:{path:"product",populate:{path:"category"}}})
    .populate('user','username')
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)
}
// get order by users
exports.getOrderByUser =async (req,res)=>{
    let orders = await Order.find({user:req.params.userId})
    .populate({path:"orderItems",populate:{path:"product",populate:{path:"category"}}})
    .populate('user','username')
    if(!orders){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(orders)
}
// update order status

exports.UpdateOrder = async (req,res)=>{
    let order = await Order.findByIdAndUpdate(req.params.id,{
        status:req.body.status
    },{new:true})
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)
}