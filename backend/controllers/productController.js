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