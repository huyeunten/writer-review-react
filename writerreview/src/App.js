import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Posts from "./components/Posts";
import Post from "./components/Post";
import Review from "./components/Review";
  
const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);
  
    // logout the user
    const handleLogout = () => {
      setUser({});
      setUsername("");
      setPassword("");
      localStorage.clear();
    };
  
    // login the user
    const handleSubmit = async e => {
      e.preventDefault();
      const user = { username, password };
      // send the username and password to the server
      const response = await axios.post(
        "http://blogservice.herokuapp.com/api/login",
        user
      );
      // set the state of the user
      setUser(response.data);
      // store the user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
    };
  
    // if there's a user show the message below
    if (user) {
      return (
        // PUT NEW WEBPAGE INTO THAT DIV
        <div>
           <h2>Welcome to the WriterReview blog page! Thank you for submitting an excerpt. You can now view other users' excerpts and write feedback.</h2>
          
          <Posts />
          <button onClick={handleLogout}>logout</button>
        </div>
        
      );
    }
  
    // if there's no user, show the login form
    return (
      <div>
        <img src="https://64.media.tumblr.com/065dea6490e2a53f45c96f7e41bd1de9/bea1cc46afc040ef-78/s1280x1920/1a4f1fb802a6deb0e1eaf3fae093d8e28a77b58c.jpg"
          width={200}
        />
        <header>WriterReview</header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            placeholder="enter a username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              value={password}
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default App;
  
    /*<div className="main-container">
      <h1 className="main-heading">
        WriterReview: Blog
      </h1>
      <Posts />
    </div> 
  );
};
  
export default App; */