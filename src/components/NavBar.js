import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faHouse,
  faSignIn,
  faCircleUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function NavBar() {
  let { id } = useParams();
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">G</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* LEFT SIDE */}
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon icon={faHouse} className="mx-2" />
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/posts">
            Posts
          </Nav.Link>
        </Nav>

        {/* RIGHTSIDE */}
        {!authState.status ? (
          <Nav>
            <Nav.Link as={Link} to="/auth/registration" className="px-0">
              <FontAwesomeIcon icon={faUserPlus} className="mx-2" />
              Register
            </Nav.Link>

            <Nav.Link as={Link} to="/auth" className="px-0">
              <FontAwesomeIcon icon={faSignIn} className="mx-2 " />
              Login
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link
              as={Link}
              to={`/profile/${authState.id}`}
              className="px-0"
            >
              <FontAwesomeIcon icon={faCircleUser} className="mx-2" />
              {authState.username.slice(0, 10).toUpperCase()}
            </Nav.Link>
            <button className="btn px-0" onClick={logout}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mx-2"
              />
              Logout
            </button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
