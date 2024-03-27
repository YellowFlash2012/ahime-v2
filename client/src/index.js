import React from "react";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// components and pages imports
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./pages/Payment";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />} />

            <Route path="/products/:id" element={<SingleProduct />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          
                <Route path="/payment" element={<Payment />} />
            </Route>
        </Route>
    )
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
