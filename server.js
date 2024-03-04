import express from "express"
import { config } from "dotenv"

import connectDB from "./config/db.js";
import Product from "./models/Product.js";

config()

connectDB()

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

app.listen(port, () => { console.log(`Server running on port ${port}`) });