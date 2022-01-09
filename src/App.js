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
import Addcouers from "./components/Adddcouers";
import Quiz from "./components/Quiz";
import { Route } from "react-router";

function App() {
  const [admin, setadmin] = useState(false);
  const [userId, setuserId] = useState(false);
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
      <NavBar1 token={token} setToken={setToken} admin={admin} />
      <Route
        exact
        path="/Courses"
        render={() => {
          return <Courses token={token} admin={admin} />;
        }}
      />

      <Route
        exact
        path="/Quiz/:id"
        render={() => {
          return <Quiz token={token} />;
        }}
      />

      <Route
        exact
        path="/login"
        render={() => {
          return (
            <Login
              setToken={setToken}
              setadmin={setadmin}
              setuserId={setuserId}
            />
          );
        }}
      />
      <Route exact path="/signUp" component={SignUp} admin={admin} />
      <Route
        exact
        path="/addcouers"
        render={() => {
          return <Addcouers token={token} admin={admin} />;
        }}
      />
      <Route
        exact
        path="/OneCouers/:id"
        render={() => {
          return <OneCouers token={token} admin={admin} />;
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
          return <Articles token={token} admin={admin} />;
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
          return <List token={token} userId={userId} />;
        }}
      />
    </div>
  );
}

export default App;
