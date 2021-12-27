import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
export default function Profile({ token }) {
  const [user, setuser] = useState("");
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [password, setpass] = useState("");
  const [updpro, setupdpro] = useState(false);

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/user", {
      headers: { authorization: "Bearer " + token },
    });
    setuser(res.data);
    console.log(res.data);
  }, []);
  const cahngename = (e) => {
    setname(e.target.value);
  };
  const cahngeimg = (e) => {
    setimg(e.target.value);
  };
  const cahngepass = (e) => {
    setpass(e.target.value);
  };

  const update = async () => {
    if (token) {
      const result = await axios.put(
        "http://localhost:5000/updateuser",
        {
          name: name,
          img: img,
          password: password,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setuser(result.data);
      console.log(result.data);
    }
  };

  const deletacount = async () => {
    try {
      const deletedCourse = await axios.delete(
        "http://localhost:5000/deleteuser",
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      setuser(deletedCourse);
    } catch (error) {
      console.log("erroe");
    }
  };

  const updat = () => {
    setupdpro(!updpro);
  };
  const alldata = (
    <div>
      <input
        onChange={(e) => {
          cahngename(e);
        }}
        type="text"
        placeholder="الاسم"
      />
      <input
        onChange={(e) => {
          cahngepass(e);
        }}
        type="password"
        placeholder="الرمز"
      />
      <input
        onChange={(e) => {
          cahngeimg(e);
        }}
        type="text"
        placeholder="الصوره"
      />
      <button
        onClick={() => {
          update();
        }}
      >
        {" "}
        حدث
      </button>
    </div>
  );
  return (
    <div>
      <div className="profile">
        <img src={user.img} />
        <br></br>
        {user.name}
        <br></br>
        {user.email}

        <button
          onClick={() => {
            deletacount();
          }}
        >
          {" "}
          حذف الحساب
        </button>
        <button
          onClick={() => {
            updat();
          }}
        >
          للتحديث اضغط هنا{" "}
        </button>
        {updpro ? alldata : ""}
      </div>
    </div>
  );
}
