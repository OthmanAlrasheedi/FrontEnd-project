import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./quiz.css";
// http رقوست axsios
export default function Quiz({ token }) {
  const [quizs, setquizs] = useState([]);
  const [quis, setquis] = useState(0);
  const [score, setscore] = useState([]);
  const [ane1, setane1] = useState("");
  const [ane2, setane2] = useState("");
  const [ane3, setane3] = useState("");
  const [ane4, setane4] = useState("");
  const [quiston, setquiston] = useState("");

  const { id } = useParams();

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/gettset/${id}`, {
        headers: { authorization: "Bearer " + token },
      });
      setquizs(res.data.quiz);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const radio = (e, i) => {
    const copy = [...score];
    copy[i] = e.target.value;
    setscore(copy);
  };

  const answer = () => {
    setquis(score);
    alert(score);
  };
  return (
    <div>
      {/* <input
        onChange={(e) => {
          quiston(e);
        }}
        type="text"
      />
      <input
        onChange={(e) => {
          radio1(e);
        }}
        type="radio"
        id="s1"
        name="quiz"
        value={boolean}
      />
      <input
        onChange={(e) => {
          radio2(e);
        }}
        type="radio"
        id="s2"
        name="quiz"
        value={boolean}
      />
      <input
        onChange={(e) => {
          radio3(e);
        }}
        type="radio"
        id="s3"
        name="quiz"
        value={boolean}
      />{" "}
      <input
        onChange={(e) => {
          radio4(e);
        }}
        type="radio"
        id="s4"
        name="quiz"
        value={boolean}
      /> */}
      {quizs.map((ele, i) => {
        return (
          <div className="quiz12" key={i}>
            <h1>{ele.q.Q}</h1>

            <ol>
              <li>
                <input
                  onChange={(e) => {
                    radio(e, i);
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
                    radio(e, i);
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
                    radio(e, i);
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
                    radio(e, i);
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
