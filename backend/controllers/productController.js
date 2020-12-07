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

// description      Create a product
// route            POST /api/products
// access           Private/Admin
export const createProduct = asyncHandler(async (request, response) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: request.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    })

    const createdProduct = await product.save()
    response.status(201).json(createdProduct)
});

// description      Update a product
// route            PUT /api/products/:id
// access           Private/Admin
export const updateProduct = asyncHandler(async (request, response) => {
    const {
        name, price, image, brand, category, countInStock, description,
    } = request.body

    const product = await Product.findById(request.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.description = description

        const updatedProduct = await product.save()
        response.json(updatedProduct)

    } else {
        response.status(404)
        throw new Error("Product not found")
    }
});

// description      Create new review
// route            POST /api/products/:id/reviews
// access           Private
export const createProductReview = asyncHandler(async (request, response) => {
    const {rating, comment} = request.body

    const product = await Product.findById(request.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(el => el.user.toString() === request.user._id.toString())

        if (alreadyReviewed) {
            response.status(400)
            throw new Error("Product already reviewed")
        }
        const review = {
            name: request.user.name,
            rating: Number(rating),
            comment,
            user: request.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        response.status(200).json({message: "Review added"})
    } else {
        response.status(404)
        throw new Error("Product not found")
    }
});