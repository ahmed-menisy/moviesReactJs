import { Offline, Online } from "react-detect-offline";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import ProtectedRouteBlank, { ProtectedRouteAuth } from "../BlankLayout/ProtectedRoute/ProtectedRoute";
import AuthLayout from "./../AuthLayout/AuthLayout";
import Login from "./../AuthLayout/components/Login/Login";
import Register from "./../AuthLayout/components/Register/Register";
import BlankLayout from "./../BlankLayout/BlankLayout";
import Details from "./../BlankLayout/components/Details/Details";
import Home from "./../BlankLayout/components/Home/Home";
import Movies from "./../BlankLayout/components/Movies/Movies";
import People from "./../BlankLayout/components/Pepole/People";
import Tvshows from "./../BlankLayout/components/Tvshows/Tvshows";
import Notfound from "./../Notfound/Notfound";

function App() {
   const routes = createHashRouter([
      {
         path: "",
         element: (
            <ProtectedRouteBlank>
               <BlankLayout />
            </ProtectedRouteBlank>
         ),
         children: [
            { index: true, loader: () => redirect("home") },
            { path: "home", element: <Home /> },
            { path: "movies", element: <Movies /> },
            { path: "people", element: <People /> },
            { path: "tv", element: <Tvshows /> },
            { path: "details", element: <Details /> },
            { path: "*", element: <Notfound /> },
         ],
      },
      {
         path: "auth",
         element: (
            <ProtectedRouteAuth>
               <AuthLayout />
            </ProtectedRouteAuth>
         ),
         children: [
            { index: true, loader: () => redirect("login") },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "*", element: <Notfound /> },
         ],
      },
   ]);

   return (
      <>
         <Online>
            <RouterProvider router={routes} />
         </Online>
         <Offline>
            <h1 className="text-center display-1">Only shown offline (surprise!)</h1>
         </Offline>
      </>
   );
}

export default App;
