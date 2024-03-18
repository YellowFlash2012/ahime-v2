import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncHandler from "./asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
    
    let token;

    // read token from cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, invalid token!");
        }
    } else {
        res.status(401)
        throw new Error("Not authorized, no token!");
    }
})

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error("Not authorized, only for admin!");
    }
}