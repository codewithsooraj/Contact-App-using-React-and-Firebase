import React, { useState, useEffect } from "react";
import appDb from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    appDb
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);
  // console.log("user", user)
  return (
    <div className="main">
      <div className="card">
        <div className="card-header">
          <p>User Contact Details</p>
        </div>
        <div className="container">
          <strong>ID</strong>
          <br />
          <span>{id}</span>
          <br />
          <br />
          <strong>Name</strong>
          <br />
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email</strong>
          <br />
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact</strong>
          <br />
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
