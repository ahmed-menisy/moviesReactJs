import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { MoviesContext } from "../../../../Context/Store";
import Card from "./../../Shared/Card";
export default function Tvshows({ num }) {
   const { tv, setTv, getTrending } = useContext(MoviesContext);

   useEffect(() => {
      getTrending("tv", setTv);
   }, [getTrending, setTv]);

   return (
      <section className="row g-4  py-4">
         <Helmet>
            <meta charSet="utf-8" />
            <title>TvShows</title>
         </Helmet>
         <div className="col-md-4 align-self-center">
            <div className={`brdr w-25`}></div>
            <h3>Trending</h3>
            <h3>Tv</h3>
            <h3>To Watch Now</h3>
            <p className="text-muted">Most Watched Movies By Days</p>
            <div className={` brdr`}></div>
         </div>
         {tv.slice(0, num ?? 50).map((movie) => (
            <Card key={movie.id} movie={movie} type={movie.media_type} id={movie.id} />
         ))}
      </section>
   );
}
