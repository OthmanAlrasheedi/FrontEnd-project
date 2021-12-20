import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./courses.css";
import axios from "axios";

export default function Courses({ token }) {
  const history = useHistory();

  const [Courses, setCourses] = useState([]);
  const [vedio, setvedio] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [Description, setDescription] = useState("");

  const [search, setsearch] = useState("");

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/getCoures", {
      headers: { authorization: "Bearer " + token },
    });
    setCourses(res.data);

    console.log(token);
  }, []);
  const changeNameVal = (e) => {
    setName(e.target.value);
  };
  const changeVedcVal = (e) => {
    setvedio(e.target.value);
  };
  const changeImgVal = (e) => {
    setImg(e.target.value);
  };

  const searchTarget = (e) => {
    setsearch(e.target.value);
  };
  const changediscrption = (e) => {
    setDescription(e.target.value);
  };

  const addCourse = async () => {
    console.log("Sss");
    try {
      const result = await axios.post(
        "http://localhost:5000/addCoures",
        {
          name: name,
          Description: Description,
          img: img,
          vedio: vedio,
        },

        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(result.data);
      // setCourses([...Courses, result.data]);
      const copied = [...Courses];
      copied.push(result.data);
      setCourses(copied);
    } catch (error) {
      console.log("eroew");
    }
  };

  const deleteCoures = async (id, index) => {
    try {
      const deletedCourse = await axios.delete(
        `http://localhost:5000/deletcures/${id}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      const copied = [...Courses];
      copied.splice(index, 1);
      setCourses(copied);
    } catch (error) {
      console.log("erroe");
    }
  };

  const search1 = () => {
    const search1 = Courses.filter((element) => {
      if (element.name.toLowerCase().includes(search.toLocaleLowerCase())) {
        return element;
      }
      console.log(element);
    });
    setCourses(search1);
    return search1;
  };

  const GoTPoCoures = (id) => {
    history.push(`/OneCouers/${id}`);
    console.log();
  };

  const fav = async (id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/like/${id}`,
        {},
        {
          headers: { authorization: "Bearer " + token },
        }
      );

      console.log(result.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="allinput">
        <input
          placeholder="اللغه"
          onChange={(e) => {
            changeNameVal(e);
          }}
        />{" "}
        <input
          placeholder="رابط الفيديو"
          onChange={(e) => {
            changeVedcVal(e);
          }}
        />
        <input
          placeholder="الصورة"
          onChange={(e) => {
            changeImgVal(e);
          }}
        />
        <input
          placeholder="وصف"
          onChange={(e) => {
            changediscrption(e);
          }}
        />
        <button
          onClick={() => {
            addCourse();
          }}
        >
          أضافة درس
        </button>
      </div>
      {/* <h3>{token}</h3> */}
      <div className="inputSearch">
        <input
          className="inputSea"
          placeholder="بحث"
          onChange={(e) => {
            searchTarget(e);
          }}
        />
        <button
          onClick={() => {
            search1();
          }}
        >
          ابحث
        </button>
      </div>
      <div className="courses">
        <div className="courses">
          {Courses.map((element, i) => {
            return (
              <div className="course" key={element._id}>
                {" "}
                {/* <h1>{element.user.name}</h1> */}
                <p className="namecoures">{element.name}</p>
                <hr></hr>
                <img
                  className="map"
                  onClick={() => {
                    GoTPoCoures(element._id);
                  }}
                  src={element.img}
                  alt="nooo img"
                />
                <hr></hr>
                <p className="discrptionCoures">: {element.Description}</p>
                <hr></hr>
                <button
                  className="butremove"
                  onClick={() => {
                    deleteCoures(element._id, i);
                  }}
                >
                  حذف
                </button>
                {/* <iframe
                  width="560"
                  height="315"
                  // src={element.vedio  }
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  className="video"
                ></iframe> */}
                <BsFillHeartFill
                  className="HEART"
                  onClick={() => {
                    fav(element._id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
