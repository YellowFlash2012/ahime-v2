import path from "path"

import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import productsRoutes from "./routes/v1/products.js";
import { errorHandler, notFound } from "./middleware/error.js";
import usersRoutes from "./routes/v1/users.js";
import ordersRoutes from "./routes/v1/orders.js";
import uploadsRoutes from "./routes/v1/uploads/uploads.js";

config()

connectDB()

const app = express();

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// cookie-parser middleware
app.use(cookieParser())

const port = process.env.PORT || 5000;

// routes
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/uploads", uploadsRoutes)


app.get("/api/config/paypal", (req, res) => {
    res.send({ clientID: process.env.PAYPAL_CLIENT_ID });
})

// make uploads folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// *** config for deploying to render
if (process.env.NODE_ENV === "production") {
    // const __dirname = path.resolve();
    // set static folder
    app.use(express.static(path.join(__dirname, "/client/build")));

    // any route that is NOT API will be redirected to index.html
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
    
} else {
    app.get("/", (req, res) => {
        res.send("API is running")
    })
}

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => { console.log(`Server running on port ${port}`) });