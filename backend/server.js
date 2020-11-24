import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFoundError, errorHandler} from './middleware/errorsMiddleware.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.get('/', (request, response) => {
    response.send("it's works!")
})

app.use('/api/products', productRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFoundError)
app.use(errorHandler)

const PORT = process.env.PORT || 7777
const MODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server listen in '${MODE}' mode on port ${PORT}`.yellow.bold));