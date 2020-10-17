import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';
import colors from 'colors';


dotenv.config()
connectDB()
const app = express();

app.get('/', (request, response) => {
    response.send("it's works!")
});

app.get('/api/products', (request, response) => {
    response.json(products)
});

app.get('/api/products/:id', (request, response) => {
    const product = products.find(el => el._id === request.params.id)
    response.json(product)
});

const PORT = process.env.PORT || 7777
const MODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server listen in '${MODE}' mode on port ${PORT}`.yellow.bold));