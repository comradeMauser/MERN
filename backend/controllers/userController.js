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

// description      Update user profile
// route            PUT /api/users/profile
// access           Private
export const updateUserProfile = asyncHandler(async (request, response) => {
    const user = await User.findById(request.user._id)

    if (user) {
        user.name = request.body.name || user.name
        user.email = request.body.email || user.email
        if (request.body.password) {
            user.password = request.body.password
        }
        const updateUser = await user.save()

        response.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
        })
    } else {
        response.status(404)
        throw new Error("User not found")
    }
});

// description      Get all users
// route            GET /api/users
// access           Private/Admin
export const getUsers = asyncHandler(async (request, response) => {
    const users = await User.find({})
    response.json(users)
});

// description      Delete user
// route            DELETE /api/users/:id
// access           Private/Admin
export const deleteUser = asyncHandler(async (request, response) => {
    const user = await User.findById(request.params.id)
    if (user) {
        await user.remove()
        response.json({message: "erased"})
    } else {
        response.status(404)
        throw new Error("I don`t know this guy")
    }
});