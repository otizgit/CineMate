import React from "react";
import Routers from "../../routes/Routers";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import ImageOverlay from "../interface/ImageOverlay";

export default function Layout() {
  return (
    <div className="bg-bgDark">
      <Header />
      <Routers />
      <Footer />
      <ImageOverlay />
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
