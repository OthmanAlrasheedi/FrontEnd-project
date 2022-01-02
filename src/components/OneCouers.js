import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./oncoures.css";
import { useHistory } from "react-router-dom";
import { use } from "express/lib/application";

export default function OneCouers({ token }) {
  // بالبدايه الستيت قيمته تكون فاضيه
  const [allcouers, setallcouers] = useState(null);
  const [img, setimg] = useState("");
  const [dis, setdis] = useState("");
  const [vedio, setvedio] = useState("");
  const [onCoers, setonCoers] = useState(true);
  const [update, setupdate] = useState(false);
  const [comm, setcomm] = useState("");
  const [comment, setcomment] = useState([]);
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

  useEffect(async () => {
    try {
      if (token) {
        const res = await axios.get(`http://localhost:5000/addcomment`, {
          headers: { authorization: "Bearer " + token },
        });
        // setallcouers(res.data);

        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const inputcomm = (e) => {
    setcomm(e.target.value);
  };

  const gotolearn = (ele) => {
    setonCoers(ele);
    console.log();
  };
  const updateCoures = async () => {
    if (token) {
      console.log(dis, img);
      try {
        const result = await axios.put(
          `http://localhost:5000/putCoures/${id}`,
          {
            Description: dis,
            img: img,
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        );
        // setallcouers(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addVedio = async (id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/AddVedio/${id}`,
        {
          vedio: vedio,
        },

        {
          headers: { authorization: "Bearer " + token },
        }
      );

      setallcouers(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeved = async (ele) => {
    try {
      console.log("hii");
      const result = await axios.delete(
        `http://localhost:5000/delVedio/${id}/${ele}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      console.log(result.data, "jkbkb");

      setallcouers(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const changeved = (e) => {
    setvedio(e.target.value);
  };

  const updat = () => {
    setupdate(!update);
  };

  const delcomm = async (comment) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/delcommen/${id}`,
        {
          comment: comment,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      console.log(res.data, "jkbkb");
      setcomment({ ...allcouers, comment: res.data.comment });
    } catch (error) {
      console.log(error);
    }
  };

  const Addcomm = async () => {
    try {
      const addcom = await axios.post(
        `http://localhost:5000/addcomment/${id}`,
        {
          comment: comm,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setallcouers(addcom.data);
    } catch (error) {
      console.log("Erroe");
    }
  };
  const alldata = (
    <div className="alldataonecoues">
      <input
        onChange={(e) => {
          setdis(e.target.value);
        }}
        type="text"
        placeholder="الوصف"
      />
      <input
        onChange={(e) => {
          setimg(e.target.value);
        }}
        type="text"
        placeholder="الصوره"
      />
      <button
        onClick={() => {
          updateCoures(id);
        }}
      >
        حدث{" "}
      </button>
    </div>
  );
  console.log(alldata);

  const allved = <div></div>;
  return (
    <>
      {/* هنا نتحقق اذا جت وموجوره اظهرها اذا ماجاء شيء طلع لي  شيئ فاضي */}
      {allcouers !== null ? (
        <div className="OneCoures">
          <div className="updatone">
            <input
              type="text"
              placeholder="الفيديو"
              onChange={(e) => {
                changeved(e);
              }}
            />
            <button
              onClick={() => {
                addVedio(id);
              }}
            >
              {" "}
              اضف فيديو{" "}
            </button>

            <button
              onClick={() => {
                updat();
              }}
            >
              {" "}
              للتحديث اضغط هنا
            </button>
          </div>
          {update ? alldata : ""}
          <br></br>
          <div className="allname" >
            {allcouers.name}
            <br></br>
            {allcouers.Description}
          </div>
          <br></br>
          <div className="divmapAndframe">
            <div className="btnOncoures">
              {allcouers.vedios.map((ele, i) => {
                return (
                  <div className="divmap">
                    <span>
                      {" "}
                      <button
                        onClick={() => {
                          gotolearn(ele);
                        }}
                      >
                        {i + 1} الدرس{" "}
                      </button>
                      <button
                        className="delved"
                        onClick={() => {
                          removeved(ele);
                        }}
                      >
                        {" "}
                        ❌{" "}
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="frame">
            <iframe
              className="mx-auto frame"
              width="600"
              height="400"
              src={`https://www.youtube.com/embed/${onCoers}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="video"
            ></iframe>
            <br></br>
          </div>
          {allcouers.comment.map((ele, i) => {
            return (
              <div className="bigcomm">
                <div className="comm">
                  {ele.usename}
                  {ele.comment}
                  <button
                    onClick={() => {
                      delcomm(ele._id, i);
                    }}
                  >
                    {" "}
                    حذف التعليق
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            <input
              type="text"
              onChange={(e) => {
                inputcomm(e);
              }}
            />
            <button
              onClick={() => {
                Addcomm();
              }}
            >
              علق!{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
