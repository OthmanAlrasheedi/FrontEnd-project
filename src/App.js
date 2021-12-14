import React, { useState } from "react";
import Courses from "./components/Courses";
import Articles from "./components/Articles";
import Login from "./components/Login";
import List from "./components/List";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Favirot from "./components/Favirot";
import OneCouers from "./components/OneCouers";
import { Route } from "react-router";

import "./App.css";
function App() {
  const [token, setToken] = useState("");

  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Route
        exact
        path="/Courses"
        render={() => {
          return <Courses token={token} />;
        }}
      />
      <Route
        exact
        path="/login"
        render={() => {
          return <Login setToken={setToken} />;
        }}
      />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/OneCouers/:id" component={OneCouers} />

      <Route
        exact
        path="/Favirote"
        render={() => {
          return <Favirot token={token} />;
        }}
      />
      <Route
        exact
        path="/Articles"
        render={() => {
          return <Articles token={token} />;
        }}
      />
      <Route
        exact
        path="/Profile"
        render={() => {
          return <Profile token={token} />;
        }}
      />
      <Route
        exact
        path="/List"
        render={() => {
          return <List token={token} />;
        }}
      />
    </div>
  );
}

export default App;
