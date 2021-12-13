import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Articles() {
  const [articals, setarticals] = useState([]);

  useEffect(async () => {
    const respons = await axios.get("http://localhost:5000/articl");
    setarticals(respons.data);
  }, []);
  return (
    <div>
      {articals.map((elem, i) => {
        return <div>{elem.article}</div>;
      })}
    </div>
  );
}
