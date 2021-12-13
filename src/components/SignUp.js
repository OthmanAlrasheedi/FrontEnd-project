import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    console.log({
      name: name,
      email: email,
      password: password,
    });
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 201) {
        history.push("/login");
      }
    } catch (error) {
      console.log("err");
    }
  };
  return (
    <div className="signup">
      <input
        onChange={(e) => {
          changeName(e);
        }}
        placeholder="enter your name"
      />
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        placeholder="enter your email"
      />
      <input
        onChange={(e) => {
          changePassword(e);
        }}
        type="password"
        placeholder="enter your password"
      />
      <button
        onClick={() => {
          addUser();
        }}
      >
        sign up
      </button>
    </div>
  );
}
