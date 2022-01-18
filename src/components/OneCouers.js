import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./oncoures.css";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

export default function OneCouers({ token, admin }) {
  // بالبدايه الستيت قيمته تكون فاضيه
  const [allcouers, setallcouers] = useState(null);
  const [user, setuser] = useState([]);
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
        setimg(res.data.img);
        setdis(res.data.dis);

        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    if (token) {
      const res = await axios.get("http://localhost:5000/user", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(res.data);
      console.log(res.data);
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
  }, [comment]);

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

      setallcouers(result.data);
      console.log(result.data);
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
      setcomment(res.data.comment);
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

  // const deletecomment = async (comment) => {
  //   try {
  //     const result = await axios.put(
  //       `http://localhost:5000/delcommen/${id}`,
  //       { comment: comment,

  //       },
  //       { headers: { authorization: "Bearer " + token } }
  //     );
  //     console.log(result.data);
  //     setallcouers({ ...allcouers, comment: result.data.comment });
  //   } catch (err) {
  //     console.log(err.res.data, "error");
  //   }
  const alldata = (
    <div className="alldataonecoues">
      <input
        onChange={(e) => {
          setdis(e.target.value);
        }}
        type="text"
        placeholder="الوصف"
        value={dis}
      />
      <input
        onChange={(e) => {
          setimg(e.target.value);
        }}
        type="text"
        placeholder="الصوره"
        value={img}
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

  const gotoquiz = (id) => {
    history.push(`/Quiz/${id}`);
    console.log(id);
  };

  const addinlist = () => {
    history.push(`/List`);
  };
  return (
    <>
      {/* هنا نتحقق اذا جت وموجوره اظهرها اذا ماجاء شيء طلع لي  شيئ فاضي */}

      {user.admin == true ? "" : ""}
      {allcouers !== null ? (
        <div className="OneCoures">
          <div className="updatone">
            {" "}
            {user.admin == true ? (
              <input
                type="text"
                placeholder="الفيديو"
                onChange={(e) => {
                  changeved(e);
                }}
              />
            ) : (
              ""
            )}
            {user.admin == true ? (
              <button
                onClick={() => {
                  addVedio(id);
                }}
              >
                {" "}
                اضف فيديو{" "}
              </button>
            ) : (
              ""
            )}
            {user.admin == true ? (
              <button
                onClick={() => {
                  updat();
                }}
              >
                {" "}
                للتحديث اضغط هنا
              </button>
            ) : (
              ""
            )}
          </div>
          {update ? alldata : ""}
          <br></br>
          <div className="allname">
            <h1>{allcouers.name}</h1>
            <br></br>
            <h3 style={{ width: "450px" }}> {allcouers.Description}</h3>
          </div>
          <br></br>
          <div className="divmapAndframe">
            <div className="btnOncoures">
              {allcouers.vedios.map((ele, i) => {
                return (
                  <div className="divmap">
                    <button
                      className="vedios"
                      onClick={() => {
                        gotolearn(ele);
                      }}
                    >
                      {i + 1} الدرس{" "}
                    </button>

                    {user.admin == true ? (
                      <span>
                        {" "}
                        <button
                          className="vedios"
                          onClick={() => {
                            removeved(ele);
                          }}
                        >
                          {" "}
                          ❌{" "}
                        </button>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              <button
                className="quiz"
                onClick={() => {
                  gotoquiz(id);
                }}
              >
                {" "}
                اختبر نفسك
              </button>
            </div>
          </div>
          <div className="frame">
            <iframe
              className="mx-auto frame"
              width="850"
              height="600"
              src={`https://www.youtube.com/embed/${onCoers}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="video"
            ></iframe>
            <button
              className="addinlist"
              onClick={() => {
                addinlist();
              }}
            >
              دون ملاحظاتك
            </button>

            <br></br>
          </div>
          <div className="comments">
            {allcouers.comment.map((ele, i) => {
              return (
                <div className="bigcomm">
                  <div className="comment"></div>
                  <div className="comment-info">
                    {ele.img}
                    <p className="commenter"> {ele.usename}</p>

                    <p className="commen">{parse(ele.comment)}</p>

                    <button
                      className="deletecomm"
                      onClick={() => {
                        delcomm(ele.comment);
                      }}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={comm}
              onChange={(e, editor) => {
                const data = editor.getData();
                setcomm(data);
              }}
            />
            <button
              onClick={() => {
                Addcomm();
              }}
            >
              علق{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
