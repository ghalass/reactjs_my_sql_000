/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // react-bootstrap elements import
import Card from "react-bootstrap/Card";
import axios from "axios";
// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen, faKey } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../helpers/AuthContext";
function Profile() {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/posts/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);

  const editProfile = () => {
    alert("edit Profile");
  };
  const deleteProfile = () => {
    alert("delete Profile");
  };
  return (
    <div className="">
      <h6>
        Profile {id} | {username}
      </h6>
      <div className="row container-fluid">
        <div className="col-xl-2 col-lg-4 col-md px-0">
          Profile
          <div className="col">
            <Card>
              <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <span className="text-muted font-italic ml-1">
                    ({listOfPosts?.length}) Posts
                  </span>
                </Card.Subtitle>
                <Card.Text>body text</Card.Text>
                Rôle :
                <hr className="my-1" />
                {authState.username === username && (
                  <div className="">
                    <span className="btn p-0">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="mx-2 text-danger"
                        onClick={() => {
                          deleteProfile();
                        }}
                      />
                    </span>
                    <span className="btn p-0">
                      <FontAwesomeIcon
                        icon={faPen}
                        className="mx-2 text-primary"
                        onClick={() => {
                          editProfile();
                        }}
                      />
                    </span>
                    <span className="btn p-0">
                      <FontAwesomeIcon
                        icon={faKey}
                        className="mx-2 text-warning"
                        onClick={() => {
                          navigate("/changepassword");
                        }}
                      />
                    </span>
                  </div>
                )}
              </Card.Body>
            </Card>
            Comments
            <Card className="mt-2">
              <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <span className="text-muted font-italic ml-1">
                    ({listOfPosts?.length}) Posts
                  </span>
                </Card.Subtitle>
                <Card.Text>body text</Card.Text>
                Rôle :
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* LIST OF POSTS */}
        <div className="col-xl-10 col-lg-8 col-md px-0">
          List of posts
          {listOfPosts.map((post, key) => {
            return (
              <div key={key}>
                <Card className="mb-2">
                  <Card.Body>
                    <Card.Title>
                      <span className="onHoverLocal">
                        <Link to={`/post/${post.id}`}>
                          {post.title?.slice(0, 25)}
                        </Link>
                      </span>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <span className="text-muted font-italic ml-1">
                        by :
                        {/* {authState.username === comment.username ? (
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
                        )} */}
                      </span>
                    </Card.Subtitle>
                    <Card.Text> {post.postText?.slice(0, 40)}</Card.Text>
                    {/* {authState.username === comment.username && (
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
                    )} */}
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

export default Profile;
