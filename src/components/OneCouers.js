import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./oncoures.css";
import { useHistory } from "react-router-dom";

export default function OneCouers({ token }) {
  // بالبدايه الستيت قيمته تكون فاضيه
  const [allcouers, setallcouers] = useState(null);
  const [img, setimg] = useState("");
  const [dis, setdis] = useState("");
  const [vedio, setvedio] = useState("");
  const [onCoers, setonCoers] = useState(true);
  const [update, setupdate] = useState(false);
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
  const removeved = async ( ele) => {
    try {
      console.log("hii");
      const result = await axios.delete(
        `http://localhost:5000/delVedio/${id}/${ele}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      console.log(result.data,"jkbkb");

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

  const alldata = (
    <div>
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
          <br></br>
          <button
            onClick={() => {
              updat();
            }}
          >
            {" "}
            للتحديث اضغط هنا
          </button>
          {update ? alldata : ""}
          <br></br>
          {allcouers.name}
          <br></br>
          {allcouers.Description}

          <br></br>
          <div className="divmapAndframe">
            <div className="frame">
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
            <div className="btnOncoures">
              {allcouers.vedios.map((ele, i) => {
                return (
                  <div className="divmap">
                    .
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
                        onClick={() => {
                          removeved(ele);
                        }}
                      >
                        {" "}
                        حذف الفيديو
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
