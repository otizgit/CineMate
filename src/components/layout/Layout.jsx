import React, { useState } from "react";
import Routers from "../../routes/Routers";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  if (localStorage.getItem("wishlist") === null) {
    localStorage.setItem("wishlist", JSON.stringify([]))
  }

  return (
    <div className="bg-bgDark">
      <Header />
      <Routers />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
