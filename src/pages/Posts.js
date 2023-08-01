import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faStar,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

function Posts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // check if logged in, else redirect to login page
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/posts`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/likes`,
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        // to update the list
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div>
      <Link to="/createpost">Create</Link>
      <div className="d-flex justify-content-center">
        <Card style={{ width: "30rem" }} className="mt-2 ml-2 ">
          <Card.Header className="py-2">
            <FontAwesomeIcon icon={faFileSignature} className="mx-1" />
            Posts ({listOfPosts.length})
          </Card.Header>
          <ListGroup variant="flush">
            {listOfPosts.map((post, key) => {
              return (
                <div key={key} className="">
                  <ListGroup.Item className="py-2 onHover">
                    <div className="row d-flex text-left ">
                      {/* sdsd */}
                      <div className="col-10 ">
                        <span
                          className="onHoverLocal"
                          onClick={() => {
                            navigate(`/post/${post.id}`);
                          }}
                        >
                          {post.title.slice(0, 25)}
                        </span>

                        <span className="text-muted font-italic ml-1">
                          by :
                          {authState.username === post.username ? (
                            <span className="onHoverLocal">
                              <Link to={`/profile/${post.UserId}`}>
                                You
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-warning ml-1"
                                />
                              </Link>
                            </span>
                          ) : (
                            <span className="m-1 onHoverLocal">
                              <Link to={`/profile/${post.UserId}`}>
                                {post.username?.slice(0, 10)}
                              </Link>
                            </span>
                          )}
                        </span>
                      </div>

                      <div
                        className="col-2 border-left onHoverLocal"
                        onClick={() => likeAPost(post.id)}
                      >
                        <span className="text-muted">
                          ({post.Likes.length})
                        </span>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className={
                            likedPosts.includes(post.id)
                              ? "ml-1 text-primary"
                              : "ml-1 text-secondary"
                          }
                        />
                      </div>
                    </div>
                  </ListGroup.Item>
                </div>
              );
            })}
          </ListGroup>
        </Card>
      </div>
    </div>
  );
}

export default Posts;
