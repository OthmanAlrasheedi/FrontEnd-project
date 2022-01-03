import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./oncoures.css";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

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
          <div className="allname">
            <h1>{allcouers.name}</h1>
            <br></br>
            <h3> {allcouers.Description}</h3>
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
                        className="vedios"
                        onClick={() => {
                          gotolearn(ele);
                        }}
                      >
                        {i + 1} الدرس{" "}
                      </button>
                      {/* <button
                        className="vedios"
                        onClick={() => {
                          removeved(ele);
                        }}
                      >
                        {" "}
                        ❌{" "}
                      </button> */}
                    </span>
                  </div>
                );
              })}
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

            <br></br>
          </div>
          <div className="comments">
            {allcouers.comment.map((ele, i) => {
              return (
                <div className="bigcomm">
                  <div className="comment">
                    <img
                      className="omgess"
                      src="data:image/jpeg;base64,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"
                    />
                    </div>
                    <div className="comment-info">
                    <p className="commenter"> {ele.usename}</p>

                    <p className="commen">{parse(ele.comment)}</p>
                    <button
                      className="deletecomm"
                      onClick={() => {
                        delcomm(ele._id, i);
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
