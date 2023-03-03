import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserData";
import style from "./Navbar.module.scss";
export default function Navbar() {
   const navigate = useNavigate();
   let { user, setUser } = useContext(UserContext);
   function logOut() {
      localStorage.removeItem("mToken");
      setUser(null);
      navigate("/auth/login");
   }

   return (
      <>
         <nav className={`${style.navbar} navbar navbar-expand-lg fixed-top shadow`}>
            <div className="container">
               <Link className="navbar-brand" to="home">
                  Noxie
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon" />
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <NavLink
                           className={({ isActive }) => ` ${isActive ? style.linkActive : ""} nav-link text-capitalize`}
                           aria-current="page"
                           to="home"
                        >
                           home
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className={({ isActive }) => ` ${isActive ? style.linkActive : ""} nav-link text-capitalize`}
                           to="movies"
                        >
                           movies
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className={({ isActive }) => ` ${isActive ? style.linkActive : ""} nav-link text-capitalize`}
                           to="people"
                        >
                           people
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink className={({ isActive }) => ` ${isActive ? style.linkActive : ""} nav-link text-capitalize`} to="tv">
                           tv
                        </NavLink>
                     </li>
                  </ul>

                  <ul className="navbar-nav  mb-2 mb-lg-0">
                     <li className="nav-item hstack">
                        <span className="nav-link text-uppercase text-reset ms-lg-3 badge text-bg-primary">
                           {user?.first_name.slice(0, 1)}
                        </span>
                     </li>
                     <li className="nav-item">
                        <span className="nav-link text-uppercase text-reset ms-lg-3" onClick={logOut} role="button">
                           logout
                        </span>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
}
