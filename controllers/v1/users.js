import jwt from "jsonwebtoken";
import asyncHandler from "../../middleware/asyncHandler.js";
import User from "../../models/User.js";

// @desc    Log users in
// @route   POST /api/v1/users/login
// @access  Public
export const logUserIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // console.log(email);

    if (user && (await user.matchPw(password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn:"9d"
        })

        // set token in cookies
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge:30*24*60*60*1000 //30 days
        })

        res.status(200).json({
            message: "login user success",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin:user.isAdmin
            }
            
        });
        
    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }
    
});

// @desc    Register users
// @route   POST /api/v1/users/
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    
    res.status(201).json({
        message: "register user success",
        
    });
});

// @desc    Logout users | Clear cookies
// @route   POST /api/v1/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "logout user success",
        
    });
});

// @desc    Get user Profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "get user profile success",
        
    });
});

// @desc    Update user Profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    
    res.status(201).json({
        message: "update user profile success",
        
    });
});


// *** admin routes
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        message: "get all users success",
        data:users
        
    });
});

// @desc    Get a single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getOneUserByAdmin = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "get one user success",
        
    });
});

// @desc    Update a single user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateOneUserByAdmin = asyncHandler(async (req, res) => {
    
    res.status(201).json({
        message: "update one user success",
        
    });
});

// @desc    DELETE user Profile
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "delete one user success",
        
    });
});
