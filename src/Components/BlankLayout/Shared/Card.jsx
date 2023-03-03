import React from "react";
import { environment } from "../../../environment/environment";
import style from "./Core.module.scss";
import { Link } from "react-router-dom";
export default function Card({ movie, type, id }) {
   return (
      <div className=" col-md-6 col-lg-4">
         <Link
            to={{ pathname: "/details", search: `id=${id}&type=${type}` }}
            className={`${style.card} card h-100 bg-transparent shadow text-decoration-none text-reset`}
         >
            <figure className="ratio ratio-4x3 ">
               <img
                  src={environment.imagePath + (movie.poster_path ?? movie.profile_path)}
                  className="card-img-top"
                  alt={movie.title ?? movie.name}
               />
            </figure>
            <figcaption className="card-body">
               <h3 className="h5">
                  {movie.title} {movie.name}
               </h3>

               <p className="small text-muted">{movie.overview?.split(" ", 10)}</p>
            </figcaption>
         </Link>
      </div>
   );
}
