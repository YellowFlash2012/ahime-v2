import React from 'react';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';

// import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/bootstrap.custom.css"
import './assets/styles/index.css';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      
      <Route path="/products/:id" element={<SingleProduct />} />
      
      <Route path="/cart" element={<Cart />}/>
    </Route>
  )
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
