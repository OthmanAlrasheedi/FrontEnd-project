import React, { useState, useEffect } from "react";
import axios from "axios";
import "./art.css";
export default function Articles() {
  const [articals, setarticals] = useState([]);

  useEffect(async () => {
    const respons = await axios.get("http://localhost:5000/articl");
    setarticals(respons.data);
  }, []);
  return (
    <div>
      {articals.map((elem, i) => {
        console.log(elem);
        return <div className="artiback">{elem.article}</div>;
      })}
    </div>
  );
}
