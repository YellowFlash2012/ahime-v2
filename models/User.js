import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default:false
        },
        
    },
    {
        timestamps: true,
    }
);

// compare passwords
userSchema.methods.matchPw=async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;
