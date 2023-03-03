import axios from "axios";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "./../../../../environment/environment";
import * as Yup from "yup";
import { UserContext } from "../../../../Context/UserData";

export default function Login() {
   let { saveData } = useContext(UserContext);
   const [msg, setMsg] = useState("");
   const navigate = useNavigate();

   async function submitFormData(objValues, setSubmitting) {
      const { data } = await axios.post(environment.baseUrl + "signin", objValues);
      setSubmitting(false);

      if (data.message === "success") {
         localStorage.setItem("mToken", data.token);
         saveData();
         navigate("/home");
      } else {
         setMsg(data.message);
      }
   }

   const signInSchema = Yup.object().shape({
      email: Yup.string().email("Invalid Email Pattern").required("Required Email"),
      password: Yup.string()
         .matches(/^[a-zA-Z][a-zA-Z0-9]{1,5}[a-zA-Z]$/, "Invalid Password Pattern [a-zA-Z][a-zA-Z0-9]{1,5}[a-zA-Z]")
         .required("PassWord Required"),
   });

   return (
      <section className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
         <h1 className="text-center display-3 text-uppercase">LogIn</h1>

         <Formik
            initialValues={{ email: "", password: "" }}
            // manual validation by formik
            // validate={(values) => {
            //    const errors = {};

            //    if (!values.email) {
            //       errors.email = "Required";
            //    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            //       errors.email = "Invalid email address";
            //    }

            //    if (!values.password) {
            //       errors.password = "Required";
            //    } else if (!/^[a-zA-Z][a-zA-Z0-9]{1,5}[a-zA-Z]$/.test(values.password)) {
            //       errors.password = "Invalid Password Pattern [a-zA-Z][a-zA-Z0-9]{1,5}[a-zA-Z]";
            //    }

            //    return errors;
            // }}

            validationSchema={signInSchema}
            onSubmit={(values, { setSubmitting }) => {
               submitFormData(values, setSubmitting);
            }}
         >
            {({
               values,
               errors,
               touched,
               isSubmitting,
               handleChange,
               handleBlur,
               handleSubmit,
               /* and other goodies */
            }) => (
               <form className="w-75 mx-auto" onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="email"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        id="email"
                        placeholder=" "
                     />
                     <label htmlFor="email">Email</label>
                     {errors.email && touched.email ? (
                        <p className="alert alert-danger">{errors.email && touched.email && errors.email}</p>
                     ) : (
                        ""
                     )}
                  </div>

                  <div className="form-floating mb-3">
                     <input
                        autoComplete="off"
                        type="password"
                        value={values.password}
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder=" "
                        onChange={handleChange}
                        onBlur={handleBlur}
                     />
                     <label htmlFor="password">Password</label>
                     {errors.password && touched.password && (
                        <p className="alert alert-danger">{errors.password && touched.password && errors.password}</p>
                     )}
                  </div>

                  <button className=" btn btn-primary float-end" type="submit" disabled={isSubmitting}>
                     LogIn
                  </button>
                  <div className="clearfix"></div>

                  <p>
                     Not a member yet?{" "}
                     <Link to="/auth/register" className="text-decoration-none link-primary">
                        Create Account
                     </Link>
                  </p>

                  {msg ? <p className="alert alert-danger p-1 w-50  text-center small">{msg}</p> : ""}
               </form>
            )}
         </Formik>
      </section>
   );
}
