import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./quiz.css";
// http رقوست axsios
export default function Quiz({ token }) {
  const [quizs, setquizs] = useState([]);
  const [quis, setquis] = useState(0);
  const [score, setscore] = useState(false);

  const { id } = useParams();

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/gettset/${id}`, {
        headers: { authorization: "Bearer " + token },
      });
      setquizs(res.data.quiz);
      console.log(res.data, "dataaaaaaaaaaaaa");
    } catch (error) {
      console.log("error");
    }
  }, []);

  const radio1 = (e) => {
    setscore(e.target.value);
    console.log(e.target.value);
  };
  const radio2 = (e) => {
    setscore(e.target.value);
  };
  const radio3 = (e) => {
    setscore(e.target.value);
  };
  const radio4 = (e) => {
    setscore(e.target.value);
  };
  const answer = (score) => {
  
  };
  return (
    <div>
      {quizs.map((ele, i) => {
        console.log(ele, "eleeeeeeeee");

        return (
          <div className="quiz12" key={i}>
            <h1>{ele.q.Q}</h1>

            <ol>
              <li>
                <input
                  onChange={(e) => {
                    radio1(e);
                  }}
                  type="radio"
                  id="s1"
                  name={`quiz${i}`}
                  value={ele.s1.boolean}
                />
                {ele.s1.s1}
              </li>
              <br />
              <li>
                <input
                  onChange={(e) => {
                    radio2(e);
                  }}
                  type="radio"
                  id="s2"
                  name={`quiz${i}`}
                  value={ele.s2.boolean}
                />

                {ele.s2.s2}
              </li>
              <br />
              <li>
                <input
                  onChange={(e) => {
                    radio3(e);
                  }}
                  type="radio"
                  id="s3"
                  name={`quiz${i}`}
                  value={ele.s3.boolean}
                />

                {ele.s3.s3}
              </li>
              <br />
              <li>
                <input
                  onChange={(e) => {
                    radio4(e);
                  }}
                  type="radio"
                  id="s4"
                  name={`quiz${i}`}
                  value={ele.s4.boolean}
                />
                {ele.s4.s4}
              </li>
            </ol>
          </div>
        );
      })}
      <button
        onClick={() => {
          answer();
        }}
      >
        {" "}
        ارسل
      </button>
    </div>
  );
}
