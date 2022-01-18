import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login({ setToken, setadmin, setusername, setuserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [massge, setmassge] = useState("");
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
      // if (email !== email.value || password !== password.value) {
      //   alert("الرجاء ادخل الرمز او الايميل بشكل صحيح");
      // } else {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setToken(response.data.token);
      setadmin(response.data.payload.admin);
      setusername(response.data.payload.userName);
      setuserId(response.data.payload.userId);
      console.log(setToken);
      history.push("/Courses");
    } catch (error) {
      console.log(error);
    }
  };
  const tosignup = () => {
    history.push("signUp");
  };
  return (
    <div>
      <div className="signup">
        <h1>تسجيل الدخول</h1>
        <p>
          {" "}
          <br />{" "}
          <input
            className="inputsign"
            onChange={(e) => {
              changeEmail(e);
            }}
            placeholder=" الايميل"
          />
        </p>
        <p>
          {" "}
          <br />
          <input
            className="inputsign"
            onChange={(e) => {
              changePassword(e);
            }}
            type="password"
            placeholder=" الرمز"
          />
        </p>{" "}
        <Link
          className="tosign"
          to="/signUp"
          onClick={() => {
            tosignup();
          }}
        >
          للتسجيل اضغط هنا
        </Link>
        <button
          className="but"
          onClick={() => {
            checkLogin();
          }}
        >
          دخول
        </button>
      </div>
    </div>
  );
}
