import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { MoviesContext } from "../../../../Context/Store";
import Card from "./../../Shared/Card";
export default function Movies({ num }) {
   const { movies, setMovies, getTrending } = useContext(MoviesContext);

   useEffect(() => {
      getTrending("movie", setMovies);
      return () => {
         setMovies([]);
      };
   }, [getTrending, setMovies]);

   return (
      <section className="row g-4  py-4">
         <Helmet>
            <meta charSet="utf-8" />
            <title>Movies</title>
         </Helmet>
         <div className="col-md-4 align-self-center">
            <div className={` brdr w-25`}></div>
            <h3>Trending</h3>
            <h3>Movies</h3>
            <h3>To Watch Now</h3>
            <p className="text-muted">Most Watched Movies By Days</p>
            <div className={` brdr`}></div>
         </div>
         {movies.slice(0, num ?? 50).map((movie) => (
            <Card key={movie.id} movie={movie} type={movie.media_type} id={movie.id} />
         ))}
      </section>
   );
}
