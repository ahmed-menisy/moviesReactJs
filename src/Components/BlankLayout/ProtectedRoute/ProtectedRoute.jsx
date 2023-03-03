import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteBlank({ children }) {
   if (localStorage.getItem("mToken")) {
      return children;
   } else {
      return <Navigate to="/auth/login" />;
   }
}

export function ProtectedRouteAuth({ children }) {
   if (localStorage.getItem("mToken")) {
      return <Navigate to="/home" />;
   } else {
      return children;
   }
}
