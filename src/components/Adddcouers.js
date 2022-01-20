import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";

import "./Adddcouers.css";
export default function Addcouers({ token, admin }) {
  const [add, setadd] = useState([]);
  const [name, setName] = useState("");
  const [img, setimg] = useState("");
  const [vedio, setvedio] = useState("");

  const [Description, setDescription] = useState("");
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

  const changeNameVal = (e) => {
    setName(e.target.value);
  };
  const changedeiVal = (e) => {
    setDescription(e.target.value);
  };
  const changeImgVal = (e) => {
    setimg(e.target.value);
  };

  const Addcouers = async () => {
    try {
      if (name == "" || Description == "" || img == "") {
        alert("الرجاء ادخال جميع بيانات الماده التي تريد ان تضيفها");
      } else {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/addCoures`,
          {
            name: name,
            Description: Description,
            img: img,
          },

          {
            headers: { authorization: "Bearer " + token },
          }
        );
        console.log(result.data);
        // setCourses([...Courses, result.data]);
        const copied = [...add];
        copied.push(result.data);
        setadd(copied);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addcoures">
      <input
        className=""
        type="text"
        placeholder="اسم الماده"
        required
        onChange={(e) => {
          changeNameVal(e);
        }}
      />
      <br></br>
      <input
        required
        type="text"
        placeholder="وصف "
        onChange={(e) => {
          changedeiVal(e);
        }}
      />
      <br></br>
      <label>
        <input type="file" onChange={handleChange} required />
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} setimg={setimg} />}
      </div>
      <br />
      <button
        className="butnadd"
        required
        onClick={() => {
          Addcouers();
        }}
      >
        {" "}
        اضف{" "}
      </button>
    </div>
  );
}
