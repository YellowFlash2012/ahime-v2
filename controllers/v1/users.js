import asyncHandler from "../../middleware/asyncHandler.js";

// @desc    Log users in
// @route   POST /api/v1/users/login
// @access  Public
export const logUserIn = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "login user success",
        
    });
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
    
    res.status(200).json({
        message: "get all users success",
        
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
