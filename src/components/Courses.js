import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import "./courses.css";
import axios from "axios";

export default function Courses({ token }) {
  const history = useHistory();
  const { id } = useParams();
  const [Courses, setCourses] = useState([]);
  const [vedio, setvedio] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [update, setupdate] = useState(false);
  const [like, setlike] = useState([]);

  const [search, setsearch] = useState("");

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/getCoures", {
      headers: { authorization: "Bearer " + token },
    });
    setCourses(res.data);

    console.log(token);
    if (token) {
      const res = await axios.get("http://localhost:5000/like", {
        headers: { authorization: "Bearer " + token },
      });
      setlike(res.data);
      console.log(res.data);
    }
  }, [like]);

  const changeImgVal = (e) => {
    setImg(e.target.value);
  };

  const searchTarget = (e) => {
    setsearch(e.target.value);
  };
  // const addCourse = async () => {
  //   console.log("Sss");
  //   try {
  //     const result = await axios.post(
  //       "http://localhost:5000/addCoures",
  //       {
  //         name: name,
  //         Description: Description,
  //         img: img,
  //         vedio: vedio,
  //       },

  //       {
  //         headers: { authorization: "Bearer " + token },
  //       }
  //     );
  //     console.log(result.data);
  //     // setCourses([...Courses, result.data]);
  //     const copied = [...Courses];
  //     copied.push(result.data);
  //     setCourses(copied);
  //   } catch (error) {
  //     console.log("eroew");
  //   }
  // };

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
      setlike(result.data);

      console.log(result.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const removeLike = async (id) => {
    const result = await axios.delete(`http://localhost:5000/unlike/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    setlike(result.data);
    console.log(result.data);
  };

  const updat = () => {
    setupdate(!update);
  };

  return (
    <>
      <h3 className="h2">تعلم البرمجه معنا مجاناً</h3>
      <h4 className="h4">
        نعمل يومياً على اضافة دروس جديده واضافة مقالات جديده وسنستمر في تقديم
        الدورات الى ان نوفر لكم كل ما تحتاجوه في سوق العمل{" "}
      </h4>
      <div className="inputSearch">
        <input
          className="inputSea"
          placeholder="بحث"
          onChange={(e) => {
            searchTarget(e);
          }}
        />
      </div>
      <div className="courses">
        <div className="courses">
          {Courses.filter((elme) => {
            if (search === "") {
              return elme;
            } else if (elme.name.toLowerCase().includes(search.toLowerCase())) {
              return elme;
            }
          }).map((element, i) => {
            for (let i = 0; i < like.length; i++) {
              if (like[i]._id === element._id) {
                return (
                  <div className="course" key={element._id}>
                    {" "}
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
                    <p className="discrptionCoures">: {element.Description}</p>
                    <button
                      className="butremove"
                      onClick={() => {
                        deleteCoures(element._id, i);
                      }}
                    >
                      ❌{" "}
                    </button>
                    <BsFillHeartFill
                      style={{ color: "red" }}
                      onClick={() => {
                        removeLike(element._id);
                      }}
                    />
                  </div>
                );
              }
            }
            return (
              <div className="course" key={element._id}>
                {" "}
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
                <p className="discrptionCoures">: {element.Description}</p>
                <button
                  className="butremove"
                  onClick={() => {
                    deleteCoures(element._id, i);
                  }}
                >
                  ❌{" "}
                </button>
                <BsFillHeartFill
                  sstyle={{ color: "gray" }}
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
