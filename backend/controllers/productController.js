import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// description      Fetch all products
// route            GET /api/products
// access           Public
export const getProducts = asyncHandler(async (request, response) => {
    const products = await Product.find({})
    response.json(products)
});

// description      Fetch single product
// route            GET /api/products/:id
// access           Public
export const getProductById = asyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id)

    if (product) {
        response.json(product)
    } else {
        response.status(404).json({message: "Product not found"})
    }
});

// description      Delete a product
// route            DELETE /api/products/:id
// access           Private/Admin
export const deleteProduct = asyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id)

    if (product) {
        await product.remove()
        response.json({message: "product removed"})
    } else {
        response.status(404).json({message: "Product not found"})
    }
});