import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Card from "./../../Shared/Card";
import { MoviesContext } from "./../../../../Context/Store";
export default function People({ num }) {
   const { person, setPerson, getTrending } = useContext(MoviesContext);

   useEffect(() => {
      getTrending("person", setPerson);
      return () => {
         setPerson([]);
      };
   }, [getTrending, setPerson]);

   return (
      <section className="row g-4  py-4">
         <Helmet>
            <meta charSet="utf-8" />
            <title>Pepole</title>
         </Helmet>
         <div className="col-md-4 align-self-center">
            <div className={`brdr w-25`}></div>
            <h3>Trending</h3>
            <h3>Person</h3>
            <h3>To Watch Now</h3>
            <p className="text-muted">Most Watched Movies By Days</p>
            <div className={` brdr`}></div>
         </div>
         {person.slice(0, num ?? 50).map((movie) => (
            <Card key={movie.id} movie={movie} type={movie.media_type} id={movie.id} />
         ))}
      </section>
   );
}
