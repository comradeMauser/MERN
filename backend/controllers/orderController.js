import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";


// description      Create new order
// route            POST /api/orders
// access           Private
export const addOrderItems = asyncHandler(async (request, response) => {
    const {
        orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice
    } = request.body

    if (orderItems && orderItems.length === 0) {
        response.status(400)
        throw new Error('No order items')
        // return
    } else {
        const order = new Order({
            user: request.user._id,
            orderItems, shippingAddress, paymentMethod,
            itemsPrice, taxPrice, shippingPrice, totalPrice
        })

        const createdOrder = await order.save()
        response.status(201).json(createdOrder)
    }
});

// description      Get order by ID
// route            GET /api/orders/:id
// access           Private
export const getOrderById = asyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id).populate("user", "name email")
    console.log(request.params.id)

    if (order) {
        response.json(order)
    } else {
        response.status(404)
        throw new Error("Order not found")
    }
})