import axios from "axios";
import React, { useState, useEffect } from "react";
export default function List({ token }) {
  const [List, setList] = useState([]);
  const [Addname, setAddname] = useState("");
  const [Addisc, setAddisc] = useState("");

  useEffect(async () => {
    if (token) {
      const res = await axios.get("http://localhost:5000/gettaslk", {
        headers: { authorization: "Bearer " + token },
      });
      setList(res.data);
    }
    console.log(token);
  }, []);

  const addName = (e) => {
    setAddname(e.target.value);
  };
  const Adddis = (e) => {
    setAddisc(e.target.value);
  };

  const addCours = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/addtaslk",
        {
          name: Addname,
          Description: Addisc,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      const copyarr = [...List];
      copyarr.push(res.data);
      setList(copyarr);
      console.log(copyarr);
    } catch (error) {
      console.log("error");
    }
    console.log(token);
  };
  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            addName(e);
          }}
          type="text"
          placeholder=" ااسم الماده"
        />
        <input
          onChange={(e) => {
            Adddis(e);
          }}
          type="text"
          placeholder="الشرح"
        />
        <button
          onClick={() => {
            addCours();
          }}
        >
          {" "}
          اضف
        </button>
      </div>
      {List.map((elem, i) => {
        return (
          <div>
            {elem.name}
            {elem.Description}
          </div>
        );
      })}
    </div>
  );
}
