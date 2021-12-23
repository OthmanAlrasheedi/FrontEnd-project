import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./oncoures.css";
import { useHistory } from "react-router-dom";

export default function OneCouers({ token }) {
  // بالبدايه الستيت قيمته تكون فاضيه
  const [allcouers, setallcouers] = useState(null);
  const [onCoers, setonCoers] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    // هنا جبنا البيانات من السيرفر
    try {
      if (token) {
        const res = await axios.get(`http://localhost:5000/getCoures/${id}`, {
          headers: { authorization: "Bearer " + token },
        });
        setallcouers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const gotolearn = (ele,i) => {
    setonCoers(ele);
    console.log(i);
  };

  const allvedio = (
    <div>
      <iframe
        className="frame"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${onCoers}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        className="video"
      ></iframe>
    </div>
  );
  return (
    <>
      {/* هنا نتحقق اذا جت وموجوره اظهرها اذا ماجاء شيء طلع لي  شيئ فاضي */}
      {allcouers !== null ? (
        <div className="OneCoures">
          {allcouers.name}
          <br></br>
          {allcouers.Description}
          <br></br>
          {allcouers.vedios.map((ele, i) => {
            return (
              <div>
                <span>
                  {" "}
                  <button
                    onClick={(i) => {
                      gotolearn(ele, i);
                    }}
                  >
                    تابع الدرس{" "}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div>{allvedio}</div>
    </>
  );
}
