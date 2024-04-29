
import asyncHandler from "../../middleware/asyncHandler.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";

// @desc    Log users in
// @route   POST /api/v1/users/login
// @access  Public
export const logUserIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // console.log(email);

    if (user && (await user.matchPw(password))) {
        generateToken(res, user._id)

        res.status(200).json({
            message: `Welcome back, ${user.name}`,
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

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)

        throw new Error("A user with this email address already exists, please login!")
    }

    const user = await User.create({ name, email, password });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            message: `Welcome aboard, ${user.name}!`,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }
    
});

// @desc    Logout users | Clear cookies
// @route   POST /api/v1/users/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
    // console.log(req.user);

    const user = await User.findById(req.user._id);

    res.clearCookie("jwt");

    // res.cookie("jwt", "", {
    //     httpOnly: true,
    //     expires:new Date(0)
    // })
    
    res.status(200).json({
        message: `See you next time, ${user.name}`,
        
    });
});

// @desc    Get user Profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            message: `Access to ${user.name} profile is a success`,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } else {
        res.status(404)
        throw new Error('User NOT found!')
    }
    
    
});

// @desc    Update user Profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password=req.body.password
        }

        const updatedUser = await user.save();

        res.status(201).json({
            message: `${user.name} profile was successfully updated!`,
            data: {
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin,
            }
        })
    } else {
        res.status(404);
        throw new Error("User NOT found!");
    }
    
});


// *** admin routes
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        count:users.length,
        message: "Here are all the users registered on your site",
        data:users
        
    });
});

// @desc    Get a single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getOneUserByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.status(200).json({
            success:true,
            message: "Here is the user you requested",
            data:user
        });
    } else {
        res.status(404)
        throw new Error("Sorry, user NOT found")
    }
    
});

// @desc    Update a single user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateOneUserByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save();

        res.status(201).json({
            success:true,
            message: `User ${user._id} details updated!`,
            data:updatedUser
        });
    } else {
        res.status(404);
        throw new Error("Sorry, user NOT found");
    }
    
});

// @desc    DELETE user Profile
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("Sorry, but you can't delete admin")
        }

        await user.deleteOne({ _id: user._id });

        res.status(200).json({
            success: true,
            message:`${user.name} deleted successfully!`
        })
    } else {
        res.status(404);
        throw new Error("Sorry, user NOT found");
    }
    
});
