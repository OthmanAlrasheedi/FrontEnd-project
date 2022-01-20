import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./navBar.css";
export default function NavBar1({
  token,
  setToken,
  admin,
  userId,
  username,
  setusername,
  setuserId,
}) {
  const history = useHistory();
  const [user, setuser] = useState([]);
  const [img, setimg] = useState("");

  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      headers: { authorization: "Bearer " + token },
    });
    setuser(res.data);
    console.log(res.data);
  }, [token]);

  return (
    <div className="nav">
      {token ? (
        <ul className="ul">
          {/* <div className="navbarright"> */}

          <li className="li">
            <img
              className="log"
              src="https://satr.codes/assets/images/logo.png"
            />
          </li>

          <li className="li">
            <Link to="/Courses">الدروس</Link>
          </li>

          <li className="li">
            <Link to="/List">الملاحظات </Link>
          </li>
          <li className="li">
            <Link to="/Favirote">الاعجاب</Link>
          </li>
          <li className="li">
            <Link to="/Articles">المقالات</Link>
          </li>
          <li className="li">
            {user.admin == true ? <Link to="/addcouers">اضف درس </Link> : ""}
          </li>
          {/* </div> */}
          {/* <div className="navbarleft"> */}

          <li className="liq">
            {/* <Link to="/Courses">{username} مرحبا</Link> */}
          </li>
          <li className="liq">
            <Link to="/Profile">
              {" "}
              الملف الشخصي
              {/* <img className="imgesss" src={img.img} /> */}
            </Link>
          </li>
          <li className="liq">
            <Link
              to="/login"
              onClick={() => {
                setToken("");
                setusername("");
                setuserId("");
              }}
            >
              تسجيل الخروج
            </Link>
          </li>
          {/* </div> */}
        </ul>
      ) : (
        <ul className="ul">
          <li className="liq">
            <Link to="/login">تسجيل دخول</Link>
          </li>
          <li className="liq">
            <Link to="/signUp">التسجيل</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
