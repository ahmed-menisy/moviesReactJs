import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "./../../../../environment/environment";

export default function Register() {
   const [user, setUser] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: "",
   });

   const [erors, setErors] = useState([]);

   const [isDisabled, setIsDisabled] = useState(true);

   let [msg, setMsg] = useState("");
   const navigate = useNavigate();

   async function submitFormData(e) {
      e.preventDefault();

      if (!isDisabled) {
         setIsDisabled(true);
         try {
            const { data } = await axios.post(environment.baseUrl + "signup", user);
            if (data.message === "success") {
               navigate("/auth/login");
            } else {
               setMsg(data.errors?.email.message);
            }
         } catch (error) {
            console.error(error);
         } finally {
            setIsDisabled(false);
         }
      }
   }

   function inputsValue(e) {
      const userData = { ...user };
      userData[e.target.name] = e.target.value;
      setUser(userData);
      const { error } = checkValidation(userData);

      // console.log(error, value);

      setErors(error?.details);

      error ? setIsDisabled(true) : setIsDisabled(false);

      // console.log(erors);
   }

   function checkValidation(userData) {
      const schema = Joi.object({
         first_name: Joi.string().trim().alphanum().min(2).max(20).required(),
         last_name: Joi.string().trim().alphanum().min(2).max(20).required(),
         email: Joi.string()
            .email({ tlds: { allow: ["com", "net"] } })
            .required(),
         password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9][a-zA-Z0-9s]{1,10}$")).required(),
         age: Joi.number().min(20).max(80).required(),
      });

      return schema.validate(userData);
   }

   function showError(key) {
      // return error if found it
      const curentErro = erors?.find((err) => err.path[0] === key);
      // console.log(curentErro?.message);
      return curentErro?.message; // if not error return undefined
   }

   return (
      <section className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
         <h1 className="text-center display-3 text-uppercase">Register</h1>

         <form className="w-75 mx-auto" onSubmit={submitFormData}>
            <div className="form-floating mb-3">
               <input onChange={inputsValue} type="text" className="form-control" name="first_name" id="first_name" placeholder=" " />
               <label htmlFor="first_name">First Name</label>
               {showError("first_name") ? <p className="alert alert-danger small">{showError("first_name")}</p> : ""}
            </div>

            <div className="form-floating mb-3">
               <input onChange={inputsValue} type="text" className="form-control" name="last_name" id="last_name" placeholder=" " />
               <label htmlFor="last_name">Last Name</label>
               {showError("last_name") ? <p className="alert alert-danger small">{showError("last_name")}</p> : ""}
            </div>

            <div className="form-floating mb-3">
               <input onChange={inputsValue} type="email" className="form-control" name="email" id="email" placeholder=" " />
               <label htmlFor="email">Email</label>
               {showError("email") ? <p className="alert alert-danger small">{showError("email")}</p> : ""}
            </div>

            <div className="form-floating mb-3">
               <input
                  onChange={inputsValue}
                  autoComplete="off"
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder=" "
               />
               <label htmlFor="password">Password</label>
               {showError("password") ? <p className="alert alert-danger small">{showError("password")}</p> : ""}
            </div>

            <div className="form-floating mb-3">
               <input onChange={inputsValue} type="number" className="form-control" name="age" id="age" placeholder=" " />
               <label htmlFor="age">Age</label>
               {showError("age") ? <p className="alert alert-danger small">{showError("age")}</p> : ""}
            </div>

            <button className=" btn btn-primary float-end" type="submit" disabled={isDisabled}>
               SignUp
            </button>
            <div className="clearfix"></div>

            <p>
               Already a member?
               <Link to="/auth/login" className="text-decoration-none link-primary">
                  LogIn
               </Link>
            </p>

            {msg && <p className="alert alert-danger p-1 w-50  text-center small">{msg}</p>}
         </form>
      </section>
   );
}
