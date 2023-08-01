import React, { useContext, useEffect, useState } from "react";
// packages imports
import axios from "axios";
import * as Yup from "yup";
import moment from "moment";
import frLocale from "moment/locale/fr";

// react-bootstrap elements import
import Card from "react-bootstrap/Card";
// router-dom imports
import { Link, useNavigate, useParams } from "react-router-dom";
// formik imports
import { ErrorMessage, Field, Form, Formik } from "formik";

import { AuthContext } from "../helpers/AuthContext";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPen,
  faCommentDots,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Post() {
  moment.locale("fr", [frLocale]); // can pass in 'en', 'fr', or 'es'
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  // Params
  const { id } = useParams();
  //States
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  // getAll Post
  useEffect(() => {
    // check if logged in, else redirect to login page
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/posts/byId/${id}`)
        .then((response) => {
          setPostObject(response.data);
        });
    }
  }, []);
  // getAll Comments for a specific PostId
  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${id}`).then((response) => {
    //   setComments(response.data);
    // });
  }, []);
  // Initial values
  const initialValues = {
    commentBody: "",
  };
  // Validation
  const validationSchema = Yup.object().shape({
    commentBody: Yup.string().required(),
  });
  // Functions
  const addComment = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/comments`,
        {
          commentBody: data.commentBody,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          const addedComment = response.data;
          setComments([...comments, addedComment]);
        }
      });
  };
  const deleteComment = (CommentId) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/comments/${CommentId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setComments(
            comments.filter((val) => {
              return val.id !== CommentId;
            })
          );
          alert(response.data);
        }
      });
  };

  const deletePost = (PostId) => {
    // let questionResponse = prompt("Voulez-vous supprimer ce post ? oui/non");
    if (window.confirm("Voulez-vous supprimer ce post ?")) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/posts/${PostId}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert(response.data);
            navigate(`/posts`);
          }
        });
    } else {
      alert("Aucun post n'est supprimé !!");
    }
  };

  const editPost = (post) => {
    let newTitle = prompt("Enter new title", post.title);
    let newPostText = prompt("Enter new post body", post.postText);

    let newPost = { id, newTitle, newPostText };
    if (newTitle && newPostText) {
      if (newTitle?.trim() !== "" && newPostText?.trim() !== "") {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/posts`, newPost, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            setPostObject({
              ...postObject,
              title: newTitle,
              postText: newPostText,
            });
          });
      } else {
        alert("Des données manquantes !!!");
      }
    }
  };

  return (
    <div className="">
      <Link to="/posts">Posts</Link> / Comments
      <div className="row container-fluid">
        {/* POST DETAILS */}
        <div className="col-4 ">
          <Card>
            <Card.Body>
              <Card.Title>
                {postObject.title} | ({comments.length})
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="mx-2 text-primary"
                />
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <span className="text-muted font-italic ml-1">
                  by :
                  {authState.username === postObject.username ? (
                    <>
                      <span className="m-1 onHoverLocal">
                        <Link to={`/profile/${postObject.UserId}`}>
                          You
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-warning ml-1"
                          />
                        </Link>
                      </span>
                    </>
                  ) : (
                    <span className="m-1 onHoverLocal">
                      <Link to={`/profile/${postObject.UserId}`}>
                        {postObject.username?.slice(0, 10)}
                      </Link>
                    </span>
                  )}
                </span>
              </Card.Subtitle>
              <Card.Text>{postObject.postText}</Card.Text>
              <hr className="my-1" />
              <span className="text-muted text-sm">
                <span>Created : {moment(postObject.createdAt).fromNow()}</span>
                <br />
                <span>Updated : {moment(postObject.updatedAt).fromNow()}</span>
              </span>
              {authState.username === postObject.username && (
                <>
                  <hr className="my-1" />
                  <span className="btn p-0">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="mx-2 text-danger"
                      onClick={() => {
                        deletePost(postObject.id);
                      }}
                    />
                  </span>
                  <span className="btn p-0">
                    <FontAwesomeIcon
                      icon={faPen}
                      className="mx-2 text-primary"
                      onClick={() => {
                        editPost(postObject);
                      }}
                    />
                  </span>
                </>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="col-8  ">
          {/* FORMULAIRE */}
          <Card className="mb-2">
            <Card.Body>
              <Formik
                initialValues={initialValues}
                onSubmit={addComment}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className="mt-2  ">
                    <Field
                      className="form-control "
                      id="postCommentBody"
                      name="commentBody"
                      placeholder="Comment ..."
                      autoComplete="off"
                      as="textarea"
                    />
                    <ErrorMessage
                      name="commentBody"
                      component="div"
                      className="text-danger text-left "
                    />
                  </div>

                  <div className="mt-2  d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-outline-primary "
                      type="submit"
                    >
                      Add Comment
                    </button>
                  </div>
                </Form>
              </Formik>
            </Card.Body>
          </Card>

          {/* COMMENTS */}
          <h6 className="text-left">{comments.length + " Comments"}</h6>
          {comments.map((comment, key) => {
            return (
              <div key={key}>
                <Card className="mb-2">
                  <Card.Body>
                    <Card.Title>Comment</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <span className="text-muted font-italic ml-1">
                        by :
                        {authState.username === comment.username ? (
                          <>
                            You
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-warning ml-1"
                            />
                          </>
                        ) : (
                          <span className="m-1">
                            {comment.username?.slice(0, 10)}
                          </span>
                        )}
                      </span>
                    </Card.Subtitle>
                    <Card.Text> {comment.commentBody}</Card.Text>
                    {authState.username === comment.username && (
                      <>
                        <span className="btn p-0">
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="mx-2 text-danger"
                            onClick={() => {
                              deleteComment(comment.id);
                            }}
                          />
                        </span>
                        <span className="btn p-0">
                          <FontAwesomeIcon
                            icon={faPen}
                            className="mx-2 text-primary"
                          />
                        </span>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
