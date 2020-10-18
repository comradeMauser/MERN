import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from "./config/db";
import users from './data/users.js';
import products from "./data/products";
import User from "./models/userModel";
import Product from "./models/productModel";
import Order from "./models/orderModel";

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = await createdUsers[0]._id
        const sampleProducts = products.map(el => {
            return {...el, user: adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('Data imported')
        process.exit()
    } catch (e) {
        console.log(`${e}`)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log('Data destroyed')
        process.exit()
    } catch (e) {
        console.log(`${e}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}