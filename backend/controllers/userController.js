import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'


// description      Authentication user & get token
// route            POST /api/users/login
// access           Public
export const authUser = asyncHandler(async (request, response) => {
    const {email, password} = request.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        response.status(401)
        throw new Error('You shall not pass! *(wrong email or password)')
    }
});

// description      Register new user
// route            POST /api/users
// access           Public
export const registerUser = asyncHandler(async (request, response) => {
    const {name, email, password} = request.body

    const userExists = await User.findOne({email})

    if (userExists) {
        response.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        response.status(400)
        throw new Error("Invalid User data")
    }

});

// description      Get user profile
// route            GET /api/users/profile
// access           Private
export const getUserProfile = asyncHandler(async (request, response) => {
    const user = await User.findById(request.user._id)

    if (user) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        response.status(401)
        throw new Error("User not found")
    }
});
