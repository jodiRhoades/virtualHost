import React, { useState } from 'react';
import './App.css';
import './style.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Signup from "./components/Signup";
import Arrow from "./components/Arrow";
import About from "./components/About";
import Events from "./components/Events";
import Event from "./components/Event";
import Vendor from "./components/Vendor";
import Copyright from "./components/Copyright";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./utils/UserContext";
import Verify from "./components/Signup/VerifyExtUser"

function App() {
  let [userState, setUserState] = useState({
    loggedIn: false,
    username: "khatley16",
    fname: "Kacie",
    lname: "Hatley",
    light: true,
    userID: "5e839a7bd1e335f31afcf404"
  });

  window.onload = function() {
    let currentBackground = document.getElementById("backgroundColor");
    console.log("runnin")
    let lightMode = JSON.parse(window.localStorage.getItem('lightMode'));
    if (lightMode !== null) {
      userState.light = lightMode;
      setUserState({
        ...userState
      });
      console.log("updated userstate")
    }
    if (userState.light === true) {
      currentBackground.setAttribute("style", "background-color: #fbfcf1")
    }
    if (userState.light === false) {
      currentBackground.setAttribute("style", "background-color: gray")
    }
  }

  function updateLightMode() {
    let currentBackground = document.getElementById("backgroundColor");
    if (userState.light === true) {
      userState.light = false
      currentBackground.setAttribute("style", "background-color: gray")
    }
    else if (userState.light === false) {
      userState.light = true
      currentBackground.setAttribute("style", "background-color: #fbfcf1")
    }
    setUserState({
      ...userState
    });
    window.localStorage.setItem('lightMode', userState.light);
  }

  function updateLoginStatus() {

    if (userState.loggedIn === false) {
      userState.loggedIn = true;
    }
    else if (userState.loggedIn === true) {
      userState.loggedIn = false
    }
    setUserState({
      ...userState
    });
  } 

  return (
    <div 
    className="App"
    >
      <UserContext.Provider value={userState}>
        <Router>
          <Navbar
          updateLoginStatus = {updateLoginStatus}
          />
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login />
              <Arrow />
              <About />
            </Route>
            <Route exact path={["/signup"]}>
              <Signup />
            </Route>
            <Route path="/auth/">
              <Verify />
            </Route>
            <Route exact path={["/register"]}>
              <Register />
            </Route>
            <Route exact path={["/events"]}>
              <Events />
            </Route>
            <Route path={["/event/","/event/:id"]}>
              <Event />
            </Route>
            <Route path={["/user/mydashboard", "/user/mydashboard/:id"]}>
              <Dashboard 
              userState={userState}
              />
            </Route>
            <Route exact path={"/settings"}>
              <Settings 
              userState={userState}
              updateLightMode = {updateLightMode}
              />
            </Route>
          {/* <Route path={["/vendor/:id"]}>
            <Vendor />
          </Route> */}
          <Route path={["/vendor"]}>
            <Vendor />
          </Route>
          </Switch>
          <Copyright />
      </Router>
    </UserContext.Provider>
    </div>

  );
}

export default App;
