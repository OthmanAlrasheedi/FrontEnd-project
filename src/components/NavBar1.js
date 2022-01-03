import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./navBar.css";
export default function NavBar1({ token, setToken }) {
  const history = useHistory();
  const [img, setimg] = useState("");

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/user", {
      headers: { authorization: "Bearer " + token },
    });
    setimg(res.data);
    console.log(res.data);
  }, []);
  return (
    <div className="nav">
      {token ? (
        <ul>
          <div className="navbarright">
            <li>
              <Link className="link" to="/Courses">
                الدروس
              </Link>
            </li>

            <li>
              <Link className="link" to="/List">
                الانجازات{" "}
              </Link>
            </li>
            <li>
              <Link className="link" to="/Favirote">
                الاعجاب
              </Link>
            </li>
            <li>
              <Link className="link" to="/Articles">
                المقالات
              </Link>
            </li>
            <li>
              <Link className="link" to="/addcouers">
                اضف درس{" "}
              </Link>
            </li>
          </div>

          <div className="navbarleft">
            <li>
              <Link className="link" to="/Profile">
                {" "}
                <img className="imgesss" src={img.img} />
              </Link>
            </li>
            <li>
              <Link
                className="link"
                to="/login"
                onClick={() => {
                  setToken("");
                }}
              >
                تسجيل الخروج
              </Link>
            </li>
          </div>
        </ul>
      ) : (
        <ul>
          <li>
            <Link className="link" to="/login">
              تسجيل دخول
            </Link>
          </li>
          <li>
            <Link className="link" to="/signUp">
              التسجيل
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
