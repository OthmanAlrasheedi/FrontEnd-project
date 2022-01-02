import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./addcouers.css";
export default function Addcouers({ token }) {
  const [add, setadd] = useState([]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [Description, setDescription] = useState("");

  const changeNameVal = (e) => {
    setName(e.target.value);
  };
  const changedeiVal = (e) => {
    setDescription(e.target.value);
  };
  const changeImgVal = (e) => {
    setImg(e.target.value);
  };

  const Addcouers = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/addCoures",
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
    } catch (error) {}
  };

  return (
    <div>
      <input
        type="text"
        placeholder="اسم الماده"
        onChange={(e) => {
          changeNameVal(e);
        }}
      />
      <br></br>
      <input
        type="text"
        placeholder="وصف "
        onChange={(e) => {
          changedeiVal(e);
        }}
      />
      <br></br>
      <input
        type="text"
        placeholder="الصورة "
        onChange={(e) => {
          changeImgVal(e);
        }}
      />
      <br />
      <button
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
