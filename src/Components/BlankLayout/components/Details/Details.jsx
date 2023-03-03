import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { environment } from "./../../../../environment/environment";
export default function Details() {
   const [search] = useSearchParams();
   const [details, setDetails] = useState([]);
   const id = search.get("id");
   const type = search.get("type");

   const getDetails = useCallback(async () => {
      const { data } = await axios.get(environment.baseDetails.replace("type", type).replace("id", id));
      setDetails(data);
   }, [id, type]);

   useEffect(() => {
      getDetails();
   }, [getDetails]);

   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Details</title>
         </Helmet>
         <div className="row g-4">
            <div className="col-md-4">
               <img src={environment.imagePath + (details.poster_path ?? details.profile_path)} className="w-100" alt="" />
            </div>
            <div className="col-md-8">
               <div>
                  <h2>
                     {details.title} {details.name}
                  </h2>
                  <p className="text-muted small">OverView : {details.overview}</p>
               </div>
            </div>
         </div>
      </>
   );
}
