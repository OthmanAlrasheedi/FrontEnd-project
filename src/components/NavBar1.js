import React from "react";
import { Link, useHistory } from "react-router-dom";
// import {
//   Navbar,
//   Nav,
//   NavDropdown,
//   Form,
//   FormControl,
//   Button,
// } from "react-bootstrap";
import "./navBar.css";
export default function NavBar1({ token, setToken }) {
  const history = useHistory();

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
                الملف الشخصي
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
