import React from 'react';
import {ToastContainer} from "react-toastify"

import { Container} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer/>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet/>
        </Container>
      </main>
    <Footer/>
    </>
  );
}

export default App;
