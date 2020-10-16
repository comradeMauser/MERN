const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');

dotenv.config()

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

app.listen(PORT, console.log(`Server listen in '${MODE}' mode on port ${PORT}`));