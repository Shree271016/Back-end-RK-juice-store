/* 
Order:user_info,
    order_items = [order_item_id]
    total,
    shipping-info,
    payment_info,
    status
    */

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const orderSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    alternate_street: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }    


})
module.exports = mongoose.model("Order",orderSchema)