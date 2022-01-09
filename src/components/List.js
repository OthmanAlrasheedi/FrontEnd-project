import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./list.css";
export default function List({ token }) {
  const [List, setList] = useState([]);
  const [user, setuser] = useState([]);
  const [Addname, setAddname] = useState("");
  const [Addisc, setAddisc] = useState("");
  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    if (token) {
      const res = await axios.get(`http://localhost:5000/gettaslk`, {
        headers: { authorization: "Bearer " + token },
      });
      setList(res.data);
      setcounter(res.data.length);
    }

    console.log(token);

    if (token) {
      const res = await axios.get("http://localhost:5000/user", {
        headers: { authorization: "Bearer " + token },
      });
      setuser(res.data);
      console.log(res.data);
    }
  }, []);

  const addName = (e) => {
    setAddname(e.target.value);
  };
  const Adddis = (e) => {
    setAddisc(e.target.value);
  };

  const addCours = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/addtaslk`,
        {
          name: Addname,
          Description: Addisc,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      const copyarr = [...List];
      copyarr.push(res.data);
      setList(res.data);
      setcounter(List.length);
      console.log(res.data);
    } catch (error) {
      console.log("error");
    }
    console.log(token);
  };

  const deltask = async (i) => {
    if (token) {
      try {
        const res = await axios.delete("http://localhost:5000/deletetask", {
          headers: { authorization: "Bearer " + token },
        });
        const copied = [...List];
        console.log(copied);
        copied.splice(i, 1);

        setList(copied);
        setcounter(counter - 1);
        console.log(copied);
      } catch (error) {
        console.log("eere");
      }
    }
  };
  return (
    <div>
      <div className="inputlist">
        <input
          className="inputadd"
          onChange={(e) => {
            addName(e);
          }}
          type="text"
          placeholder=" ااسم الماده"
        />
        <input
          onChange={(e) => {
            Adddis(e);
          }}
          type="text"
          className="discr"
          placeholder="الشرح"
        />
        <button
          onClick={() => {
            addCours();
          }}
        >
          {" "}
          اضف
        </button>
      </div>
      <h2 className="donelearn"> تم تدوين {counter} من الملاحظات</h2>
      {List.map((elem, i) => {
        return (
          <div>
            <div>
              <ul className="Lists">
                <li> {elem.name}</li>
                <li>{elem.Description}</li>
              </ul>
              <button
                onClick={() => {
                  deltask(i);
                }}
              >
                ❌
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
