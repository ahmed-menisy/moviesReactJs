import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function BlankLayout() {
   return (
      <>
         <Navbar />
         <div className="container pt-5 mt-5">
            <Outlet />
         </div>
      </>
   );
}
