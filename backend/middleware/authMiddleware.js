import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


export const protect = asyncHandler(async (request, response, next) => {
    let token

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        try {
            token = request.headers.authorization.split(' ')[1]
            console.log("token:", token)

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log("decoded:", decoded)

            request.user = await User.findById(decoded.id).select("-password")
        } catch (e) {
            console.error(e)
            response.status(401)
            throw new Error("Not Authorization, token failed")
        }
    }
    if (!token) {
        response.status(401)
        throw new Error("Not authorized, no token")
    }

    next()
})