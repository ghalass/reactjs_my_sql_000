import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  console.log(process.env.REACT_APP_BASE_URL);
  // to be able to access to the authstate evry where
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  // pour vérifier s'il y a un user connecté, car à chaque rechargement de la page authState se reinitialiser à false comme ci-dessus
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" exact element={<Posts />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/auth" exact element={<Login />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/auth/registration" exact element={<Registration />} />
            <Route path="/changepassword" exact element={<ChangePassword />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
