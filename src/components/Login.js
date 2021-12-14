import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // you can use variable instded of state in this  case
  const history = useHistory();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setToken(response.data.token);
      console.log(setToken);
      history.push("/Courses");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>تسجيل الدخول</h1>
      <div className="signup">
        <p>
          {" "}
          الايميل
          <br />{" "}
          <input
            className="inputsign"
            onChange={(e) => {
              changeEmail(e);
            }}
            placeholder=" الايميل"
          />
        </p>
        <br />
        <p>
          {" "}
          الرمز
          <br />
          <input
            className="inputsign"
            onChange={(e) => {
              changePassword(e);
            }}
            type="password"
            placeholder=" الرمز"
          />
        </p>
        <button
          className="but"
          onClick={() => {
            checkLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
