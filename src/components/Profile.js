import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import ProgressBar from "./ProgressBar";

export default function Profile({ token }) {
  const [user, setuser] = useState("");
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [password, setpass] = useState("");
  const [bio, setbio] = useState("");
  const [updpro, setupdpro] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
    setimg(e.target.value);
  };

  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      headers: { authorization: "Bearer " + token },
    });
    setuser(res.data);
    setname(res.data.name);
    setimg(res.data.img);
    setpass(res.data.password);
    setbio(res.data.bio);
    console.log(res.data);
  }, []);
  const cahngename = (e) => {
    setname(e.target.value);
  };
  // const cahngeimg = (e) => {
  //   setimg(e.target.value);
  // };
  const cahngepass = (e) => {
    setpass(e.target.value);
  };
  const cahngebio = (e) => {
    setbio(e.target.value);
  };

  const update = async () => {
    if (token) {
      const result = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateuser`,
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
        `${process.env.REACT_APP_BACKEND_URL}/deleteuser`,
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
        value={bio}
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
          value={name}
        />
        <br></br>
        <input
          onChange={(e) => {
            cahngepass(e);
          }}
          type="password"
          placeholder="الرمز"
          value={password}
        />
        <br></br>
        <label>
          <input type="file" onChange={handleChange} />
        </label>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && (
            <ProgressBar file={file} setFile={setFile} setimg={setimg} />
          )}
        </div>
        {/* <input
          onChange={(e) => {
            cahngeimg(e);
          }}
          type="text"
          placeholder="الصوره"
        /> */}
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
        <h1> {user.name}</h1>
        <br></br>
        {user.bio}
        <br></br>
        {user.email}

        <button
          className="delacount"
          onClick={() => {
            deletacount();
          }}
        >
          {" "}
          ❌{" "}
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
