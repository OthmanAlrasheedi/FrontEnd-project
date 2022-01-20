import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import axios from "axios";
import "./sigup.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [massege, setmassege] = useState("");
  // you can use variable instded of state in this  case
  const history = useHistory();
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const addUser = async () => {
    if (name == "" || email == "" || password == "") {
      alert("الرجاء  اكمل التسجيل بشكل صحيح !");
    } else {
      try {
        const response = await axios.post(
          "https://minasat-satr.herokuapp.com/signup",
          {
            name: name,
            email: email,
            password: password,
          }
        );
        console.log(response);
        if (response.status === 201) {
          history.push("/login");
        }
      } catch (error) {
        console.log("err");
      }
    }
  };
  const toLogin = () => {
    history.push("login");
  };
  return (
    <div className="Signup">
      <h1 className="h1">التسجيل</h1>
      <input
        className="csssignup"
        onChange={(e) => {
          changeName(e);
        }}
        placeholder="ادخل الاسم "
      />
      <br></br>
      <input
        type="email"
        className="csssignup"
        onChange={(e) => {
          changeEmail(e);
        }}
        placeholder="ادخل الايميل"
      />
      <br></br>
      <input
        className="csssignup"
        onChange={(e) => {
          changePassword(e);
        }}
        type="password"
        placeholder="ادخل الرمز"
      />
      <br></br>
      <button
        className="button"
        onClick={() => {
          addUser();
        }}
      >
        تسجيل
      </button>

      <br></br>
      <Link
        className="tosign"
        to="/login"
        onClick={() => {
          toLogin();
        }}
      >
        للدخول اضغط هنا{" "}
      </Link>
    </div>
  );
}
