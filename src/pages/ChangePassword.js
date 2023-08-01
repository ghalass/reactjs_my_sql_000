import React, { useContext, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { AuthContext } from "../helpers/AuthContext";

function ChangePassword() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // check if logged in, else redirect to login page
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth");
    }
  }, []);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/auth/changepassword`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate(`/profile/${authState.id}`);
        }
      });
  };

  return (
    <div className="container">
      <h6>Change your password</h6>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="mt-2  ">
            <Field
              className="form-control "
              id="oldPassword"
              name="oldPassword"
              placeholder="Old Password"
              autoComplete="off"
              type="password"
            />
            <ErrorMessage
              name="oldPassword"
              component="div"
              className="text-danger text-left "
            />
          </div>

          <div className="mt-2  ">
            <Field
              className="form-control "
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              autoComplete="off"
              type="password"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-danger text-left "
            />
          </div>

          <div className="mt-2  d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-primary " type="submit">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePassword;
