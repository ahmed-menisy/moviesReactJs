import axios from "axios";
import { createContext, useCallback, useState } from "react";
import { environment } from "../environment/environment";

export const MoviesContext = createContext([]);

export default function MoviesContextProvider(props) {
   const [movies, setMovies] = useState([]);
   const [tv, setTv] = useState([]);
   const [person, setPerson] = useState([]);

   const getTrending = useCallback(async (type, callBack) => {
      const { data } = await axios.get(environment.baseTrending.replace("type", type));
      // console.log(data.results);
      callBack(data.results);
   }, []);

   // console.log(movies, tv, person);
   // console.log("store");

   return (
      <MoviesContext.Provider value={{ movies, setMovies, setTv, setPerson, tv, person, getTrending }}>
         {props.children}
      </MoviesContext.Provider>
   );
}
