import React, { useState, useEffect } from "react";
import Courses from "./components/Courses";
import Articles from "./components/Articles";
import Login from "./components/Login";
import List from "./components/List";
import SignUp from "./components/SignUp";
import NavBar1 from "./components/NavBar1";
import Profile from "./components/Profile";
import Favirot from "./components/Favirot";
import OneCouers from "./components/OneCouers";
import { Route } from "react-router";

function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);
  return (
    <div>
      <NavBar1 token={token} setToken={setToken} />
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
      <Route
        exact
        path="/OneCouers/:id"
        render={() => {
          return <OneCouers token={token} />;
        }}
      />

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
