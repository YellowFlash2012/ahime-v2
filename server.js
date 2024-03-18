import express from "express"
import { config } from "dotenv"

import connectDB from "./config/db.js";

import productsRoutes from "./routes/v1/products.js";
import { errorHandler, notFound } from "./middleware/error.js";
import usersRoutes from "./routes/v1/users.js";



config()

connectDB()

const app = express();

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// routes
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/users", usersRoutes);

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => { console.log(`Server running on port ${port}`) });