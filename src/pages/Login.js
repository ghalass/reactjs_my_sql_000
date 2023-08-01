import React, { useContext, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // check if logged in, else redirect to login page
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate(`/posts`);
        }
        // console.log(response.data);
      });
  };

  return (
    <div className="container">
      <h6>Login</h6>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="mt-2  ">
            <Field
              className="form-control "
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="off"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger text-left "
            />
          </div>

          <div className="mt-2  ">
            <Field
              className="form-control "
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              type="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger text-left "
            />
          </div>

          <div className="mt-2 d-flex justify-content-between ">
            <div className="">
              You don't have an account ?
              <Link to="/auth/registration" className="ml-2">
                Registration
              </Link>
            </div>
            <button className="btn btn-sm btn-outline-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
