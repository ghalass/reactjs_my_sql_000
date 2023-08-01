import React, { useContext, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // check if logged in, else redirect to login page
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth");
    }
  }, []);

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/posts`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate(`/posts`);
      });
  };

  return (
    <div className="container">
      <Link to="/posts">Posts</Link>
      <h6>Create Post</h6>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="mt-2  ">
            <Field
              className="form-control "
              id="postTitle"
              name="title"
              placeholder="Post title"
              autoComplete="off"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-danger text-left "
            />
          </div>

          <div className="mt-2  ">
            <Field
              className="form-control "
              id="postText"
              name="postText"
              placeholder="Post Text"
              autoComplete="off"
            />
            <ErrorMessage
              name="postText"
              component="div"
              className="text-danger text-left "
            />
          </div>

          <div className="mt-2  d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-primary " type="submit">
              Create Post
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
