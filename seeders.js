import colors from "colors"
import mongoose from "mongoose"
import { config } from "dotenv"
import connectDB from "./config/db.js"
import Product from "./models/Product.js"
import Order from "./models/Order.js"
import User from "./models/User.js"
import users from "./data/users.js"
import products from "./data/products.js"

config()
connectDB()

const importData = async () => {
    try {
        // clean up the db
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        // insert the data
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => (
            {...product, user:adminUser}
        ))

        await Product.insertMany(sampleProducts);

        console.log("Data imported!".green.inverse);

        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);

        process.exit(1)
    }
}

const cleanDB = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        console.log("DB cleaned".amber.inverse);

        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);

        process.exit(1)
    }
}

if (process.argv[2]==="-d") {
    cleanDB()
} else {
    importData()
}