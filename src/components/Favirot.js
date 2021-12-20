import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillHeartFill } from "react-icons/bs";

export default function Favirot({ token }) {
  const [Like, setLike] = useState([]);
  useEffect(async () => {
    try {
      if (token) {
        const res = await axios.get("http://localhost:5000/like", {
          headers: { authorization: "Bearer " + token },
        });
        setLike(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const removeLike = async (id, i) => {
    const result = await axios.delete(`http://localhost:5000/unlike/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    console.log(result.data);
    const copied = [...Like];
    copied.splice(i, 1);
    setLike(copied);
  };

  return (
    <div>
      {Like.map((elem, i) => {
        return (
          <div>
            {" "}
            {/* <h1>{element.user.name}</h1> */}
            <p className="namecoures">{elem.name}</p>
            <hr></hr>
            <img src={elem.img} alt="nooo img" />
            <hr></hr>
            <p className="discrptionCoures">: {elem.Description}</p>
            <BsFillHeartFill
              onClick={() => {
                removeLike(elem._id, i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
