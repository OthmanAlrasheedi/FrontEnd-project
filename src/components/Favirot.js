import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillHeartFill } from "react-icons/bs";
import "./Favirot.css";
import { useHistory, useParams } from "react-router-dom";

export default function Favirot({ token }) {
  const history = useHistory();
  const { id } = useParams();
  const [Like, setLike] = useState([]);
  useEffect(async () => {
    try {
      if (token) {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/like`, {
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
    const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/unlike/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    console.log(result.data);
    const copied = [...Like];
    copied.splice(i, 1);
    setLike(copied);
  };

  const GoTPoCoures = (id) => {
    history.push(`/OneCouers/${id}`);
    console.log();
  };

  return (
    <div className="fav">
      {Like.map((elem, i) => {
        return (
          <div className="inpagefav">
            {" "}
            <p className="namecoures">{elem.name}</p>
            <hr></hr>
            <img
              className="imgfav"
              onClick={() => {
                GoTPoCoures(elem._id);
              }}
              src={elem.img}
              alt="nooo img"
            />
            <hr></hr>
            <p className="discrptionCoures">: {elem.Description}</p>
            <BsFillHeartFill
              className="likes"
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
