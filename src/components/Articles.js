import React, { useState, useEffect } from "react";
import axios from "axios";
import "./art.css";
export default function Articles({ token, admin }) {
  const [articals, setarticals] = useState([]);
  const [user, setuser] = useState([]);
  const [artical, setartical] = useState("");
  const [togol, settogol] = useState(false);


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
    if (token) {
      const res = await axios.get("http://localhost:5000/user", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(res.data);
      console.log(res.data);
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

  const addMM = () => {
    settogol(!togol)
  };
  return (
    <div>
 {user.admin == true 
 ? (<>
  <button
        className="butnad1"
        onClick={() => {
          addMM();
        }}
      >
        اضف مقال
      </button>
      </>):""}
      { togol === true ? (
          <>
      <div className="artic">
      
            <input
              className="addM"
              placeholder="اضف مقالك"
              type="text"
              onChange={(e) => {
                arti(e);
              }}
            />
            <button
              className="butnad1"
              onClick={() => {
                addarty();
              }}
            >
              اضف
            </button>
            </div>
          </>
        ) : (
          ""
        )}
   
      {articals.map((elem, i) => {
        console.log(elem);
        return <div className="artiback"> <p className="pp">{elem.article}</p> </div>;
      })}
    </div>
  );
}
