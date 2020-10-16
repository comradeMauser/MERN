const express = require('express');
const products = require('./data/products');


const app = express();

app.get('/', (request, response) => {
    response.send("it's works!")
});

app.get('/api/product/:id', (request, response) => {
    const product = products.find(el => el._id === request.params.id)
    response.json(product)
});

app.listen(8888, console.log('server listen on PORT 8888'));