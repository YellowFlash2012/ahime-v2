import express from "express"
import { config } from "dotenv"
import products from "./data/products.js";
import connectDB from "./config/db.js";

config()

connectDB()

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
    res.json(products);
})

app.listen(port, () => { console.log(`Server running on port ${port}`) });