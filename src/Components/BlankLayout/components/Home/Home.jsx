import React from "react";
import { Helmet } from "react-helmet";
import Movies from "../Movies/Movies";
import People from "../Pepole/People";
import Tvshows from "../Tvshows/Tvshows";
export default function Home() {
   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>
         </Helmet>
         <Movies num={7} />

         <Tvshows num={7} />
         <People num={7} />
      </>
   );
}
