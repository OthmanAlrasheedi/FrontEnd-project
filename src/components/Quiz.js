import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./quiz.css";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";
// http رقوست axsios
export default function Quiz({ token, admin }) {
  const [quizs, setquizs] = useState([]);
  const [quis, setquis] = useState(0);
  const [score, setscore] = useState([]);
  const [read1, setread1] = useState("");
  const [read2, setread2] = useState("");
  const [read3, setread3] = useState("");
  const [read4, setread4] = useState("");
  const [bol, setbol] = useState(false);
  const [bol1, setbol1] = useState(false);
  const [bol2, setbol2] = useState(false);
  const [bol3, setbol3] = useState(false);
  const [user, setuser] = useState([]);
  const [qiz, setquiz] = useState("");
  const [massege, setmassege] = useState(false);
  const [toogel, settoogel] = useState(false);

  const { id } = useParams();

  useEffect(async () => {
    try {
      if (token) {
        const res = await axios.get(
          `https://minasat-satr.herokuapp.com/gettset/${id}`,
          {
            headers: { authorization: "Bearer " + token },
          }
        );
        setquizs(res.data.quiz);
      }
    } catch (error) {
      console.log(error);
    }
    if (token) {
      const res = await axios.get("https://minasat-satr.herokuapp.com/user", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(res.data);
      console.log(res.data);
    }
  }, []);

  const radio = (e, i) => {
    const copy = [...score];
    copy[i] = e.target.value;
    setscore(copy);
  };

  const answer = () => {
    setquis(0);
    let count = 0;
    for (let i = 0; i < score.length; i++) {
      console.log(score[i]);

      if (score[i] == "true" || score[i] === true) {
        count++;
      }
    }
    console.log(quis);
    console.log(score);

    setquis(count);
    setmassege(count);
    setmassege(!massege);
    window.scrollTo(0, 0);
  };

  const quiz = (e) => {
    setquiz(e.target.value);
  };

  const radio1 = (e) => {
    setread1(e.target.value);
  };
  const radio2 = (e) => {
    setread2(e.target.value);
  };
  const radio3 = (e) => {
    setread3(e.target.value);
  };
  const radio4 = (e) => {
    setread4(e.target.value);
  };
  const bool1 = (e) => {
    setbol(e.target.value);
    console.log(e.target.value);
  };
  const bool2 = (e) => {
    setbol1(e.target.value);
  };
  const bool3 = (e) => {
    setbol2(e.target.value);
  };

  const bool4 = (e) => {
    setbol3(e.target.value);
  };

  const removequiz = async (ele, b) => {
    console.log(id, ele);
    const body = { quiz: ele };
    console.log(body);
    try {
      const result = await axios.put(
        `https://minasat-satr.herokuapp.com/deltset/${id}`,
        {
          quiz: body,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(result.data, "Data");
      // setquizs(result.data);
    } catch (error) {
      console.log(error, "hi!");
    }
  };

  const AddQuiz = async () => {
    if (token) {
      console.log(token);
      try {
        const result = await axios.post(
          `https://minasat-satr.herokuapp.com/addtset/${id}`,
          {
            quiz: {
              q: { Q: qiz },
              s1: { s1: read1, boolean: bol },
              s2: { s2: read2, boolean: bol1 },
              s3: { s3: read3, boolean: bol2 },
              s4: { s4: read4, boolean: bol3 },
            },
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        );

        setquizs(result.data.quiz);
        // console.log(copy);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addquizez = () => {
    settoogel(!toogel);
  };
  const replayquiz = () => {
    window.location.reload();
  };
  return (
    <div>
      {user.userId == true ? "" : ""}

      {toogel === true ? (
        <>
          {" "}
          {user.admin === true ? (
            <div className="addQuiz">
              <input
                onChange={(e) => {
                  quiz(e);
                }}
                type="text"
                placeholder="السؤال"
              />
              <br />
              <select
                onChange={(e) => {
                  bool1(e);
                }}
                value={bol}
              >
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
              <input
                onChange={(e) => {
                  radio1(e);
                }}
                type="text"
                placeholder="الجواب"
              />
              <br></br>
              <select
                onChange={(e) => {
                  bool2(e);
                }}
                value={bol}
              >
                <option value={false}>false</option>
                <option value={true}>true</option>
              </select>
              <input
                onChange={(e) => {
                  radio2(e);
                }}
                type="text"
                placeholder="الجواب"
              />
              <br></br>
              <select
                onChange={(e) => {
                  bool3(e);
                }}
                value={bol}
              >
                <option value={false}>false</option>
                <option value={true}>true</option>
              </select>
              <input
                onChange={(e) => {
                  radio3(e);
                }}
                type="text"
                placeholder="الجواب"
              />{" "}
              <br></br>
              <select
                onChange={(e) => {
                  bool4(e);
                }}
                value={bol}
              >
                <option value={false}>false</option>
                <option value={true}>true</option>
              </select>
              <input
                onChange={(e) => {
                  radio4(e);
                }}
                type="text"
                placeholder="الجواب"
              />
              <br></br>
              <button
                className="vv"
                onClick={() => {
                  AddQuiz();
                }}
              >
                {" "}
                اضف الاختبار
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      {user.admin == true ? (
        <button
          className="v"
          onClick={() => {
            addquizez();
          }}
        >
          اضف اختبار
        </button>
      ) : (
        ""
      )}

      {massege == true ? (
        <div>
          <h1>
            حصلت على {quis} من {quizs.length}
          </h1>

          <button
            className="vv"
            onClick={() => {
              replayquiz();
            }}
          >
            اعد الاختبار
          </button>
        </div>
      ) : (
        ""
      )}
      {quizs.map((ele, i) => {
        return (
          <div className="quiz12" key={i}>
            <h1>{ele.q.Q}</h1>

            <ol>
              <li>
                {/* {user.admin == true ? (
                  <button
                    onClick={() => {
                      removequiz(ele);
                    }}
                  ></button>
                ) : (
                  ""
                )} */}

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
        className="v"
        onClick={() => {
          answer();
        }}
      >
        اجب
      </button>
    </div>
  );
}
