import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const auth = async (req,res,next) => {
    const user = await User.findOne({ email });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "9d"
    });

    res.cookie("jwt", token, {
        htt
    })
}