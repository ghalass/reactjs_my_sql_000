import React, { useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

function Registration() {
  const navigate = useNavigate();

  useEffect(() => {
    // check if logged in, else redirect to login page
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

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
      .post(`${process.env.REACT_APP_BASE_URL}/auth`, data)
      .then((response) => {
        // console.log(response);
        navigate(`/auth`);
      });
  };

  return (
    <div className="container">
      <h6>Registration</h6>
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

          <div className="mt-2  d-flex justify-content-between ">
            <div className="">
              You have an account ?
              <Link to="/auth" className="ml-2">
                Login
              </Link>
            </div>
            <button className="btn btn-sm btn-outline-primary" type="submit">
              Registration
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
