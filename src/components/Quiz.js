import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./quiz.css";

export default function Quiz({ token }) {
  const [quizs, setquizs] = useState([]);
  const [quis, setquis] = useState(0);

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

  const chekanwr1 = (ele) => {
    if (ele == true) {
    }
  };
  const chekanwr2 = (ele) => {};
  const chekanwr3 = (ele) => {};
  const chekanwr4 = (ele) => {};

  const answer = (ele) => {
    setquis();
  };
  return (
    <div>
      {quizs.map((ele, i) => {
        console.log(ele, "eleeeeeeeee");
        console.log(ele.q.Q);
        return (
          <div className="quiz12">
            <p>{ele.q.Q}</p>

            <ol>
              <li
                onClick={() => {
                  chekanwr1(ele);
                }}
              >
                <input type="radio" id="s1" name="quiz" value="false" />
                {ele.s1.s1}
              </li>

              <li
                onClick={() => {
                  chekanwr2(ele);
                }}
              >
                <input type="radio" id="s2" name="quiz" value="true" />

                {ele.s2.s2}
              </li>

              <li
                onClick={() => {
                  chekanwr3(ele);
                }}
              >
                <input type="radio" id="s3" name="quiz" value="false" />

                {ele.s3.s3}
              </li>

              <li
                onClick={() => {
                  chekanwr4(ele);
                }}
              >
                <input type="radio" id="s4" name="quiz" value="false" />
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
        اجب
      </button>
    </div>
  );
}
