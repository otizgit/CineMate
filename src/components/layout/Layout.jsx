import React, { useState } from "react";
import Routers from "../../routes/Routers";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBox from "../interface/SearchBox";

export const searchToggleContext = React.createContext();

export default function Layout() {
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <div className="bg-bgDark">
      <searchToggleContext.Provider value={{isSearchOpen, setSearchOpen}}>
        <Header />
        <div
          className={`fixed top-[95px] w-full z-[5] padding ${
            isSearchOpen ? "scale-y-100" : "scale-y-0"
          } transition-all origin-top`}
        >
          <SearchBox
            searchWord={"Movies, TV Shows, Cast, Crew..."}
            isHeaderSearch={true}
          />
        </div>
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
      </searchToggleContext.Provider>
    </div>
  );
}
