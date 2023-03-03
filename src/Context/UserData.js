import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(null);
export default function UserContextProvider(props) {
   const [user, setUser] = useState(null);

   function saveData() {
      if (localStorage.getItem("mToken")) {
         const encode = localStorage.getItem("mToken");
         const decode = jwtDecode(encode);
         setUser(decode);
      }
   }

   // console.log("auth");

   useEffect(() => {
      saveData();
   }, []);

   return <UserContext.Provider value={{ user, setUser, saveData }}>{props.children}</UserContext.Provider>;
}
