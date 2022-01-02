import React, { useState, useEffect } from "react";
import axios from "axios";
import "./art.css";
export default function Articles({ token }) {
  const [articals, setarticals] = useState([]);
  const [artical, setartical] = useState("");

  useEffect(async () => {
    if (token) {
      try {
        const respons = await axios.get("http://localhost:5000/articl", {
          headers: { authorization: "Bearer " + token },
        });
        setarticals(respons.data);
      } catch (error) {
        console.log("Eere");
      }
    }
  }, []);

  const addarty = async () => {
    if (token) {
      try {
        const res = await axios.post(
          "http://localhost:5000/articl",
          {
            article: artical,
          },

          {
            headers: { authorization: "Bearer " + token },
          }
        );
        console.log(res.data);
        const copied = [...articals];
        copied.push(res.data);
        setarticals(copied);
      } catch (error) {
        console.log("error");
      }
    }
  };

  const arti = (e) => {
    setartical(e.target.value);
  };

  return (
    <div>
      {articals.map((elem, i) => {
        console.log(elem);
        return <div className="artiback">{elem.article} </div>;
      })}
      <button
        onClick={() => {
          addarty();
        }}
      >
        {" "}
        اضف مقال !
      </button>
      ;
      <input
        type="text"
        onChange={(e) => {
          arti(e);
        }}
      />
    </div>
  );
}
