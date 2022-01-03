import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
export default function Profile({ token }) {
  const [user, setuser] = useState("");
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [password, setpass] = useState("");
  const [bio, setbio] = useState("");
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
  const cahngebio = (e) => {
    setbio(e.target.value);
  };

  const update = async () => {
    if (token) {
      const result = await axios.put(
        "http://localhost:5000/updateuser",
        {
          name: name,
          img: img,
          password: password,
          bio: bio,
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
    <div className="alldat">
      <input
        onChange={(e) => {
          cahngebio(e);
        }}
        type="text"
        placeholder="اضف معلومات اضافيه"
      />
      <div className="inupdate">
        <input
          onChange={(e) => {
            cahngename(e);
          }}
          type="text"
          placeholder="الاسم"
        />
        <br></br>
        <input
          onChange={(e) => {
            cahngepass(e);
          }}
          type="password"
          placeholder="الرمز"
        />
        <br></br>
        <input
          onChange={(e) => {
            cahngeimg(e);
          }}
          type="text"
          placeholder="الصوره"
        />
        <br></br>
        <button
          onClick={() => {
            update();
          }}
        >
          حدث
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <div className="profile">
        <img className="imgess" src={user.img} />
        {user.bio}
        <br></br>
        {user.name}
        <br></br>
        {user.email}

        <button
          className="delacount"
          onClick={() => {
            deletacount();
          }}
        >
          {" "}
          حذف الحساب
        </button>
        <button
          className="update"
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
