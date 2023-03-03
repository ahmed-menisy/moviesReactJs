import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactDOM from "react-dom/client";
import MoviesContextProvider from "./Context/Store";
import "./index.scss";
import App from "./Components/App/App";
import UserContextProvider from "./Context/UserData";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <UserContextProvider>
      <MoviesContextProvider>
         <App />
      </MoviesContextProvider>
   </UserContextProvider>
);
