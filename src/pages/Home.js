import React, { useState, useEffect } from "react";
import appDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
const Home = () => {
  const [data, setData] = useState({});
  const [sortData, setSortData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    appDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you really wanted to delete this contact ?")) {
      appDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully", { autoClose: 3000 });
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    appDb
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortData = [];
        snapshot.forEach((snap) => {
          sortData.push(snap.val());
        });
        setSortData(sortData);
      });
  };
  const handleReset = () => {
    setSort(false);
    appDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };
  const filterData = (value) => {
    appDb.child("contacts").orderByChild("status").equalTo(value).on("value",(snapshot) => {
      if(snapshot.val()){
        const data = snapshot.val();
        setData(data)
      }
    })
  }
  return (
    <div className="container">
      <label> Sort By</label>
      <select className="dropDown" name="colValue" onChange={handleChange}>
        <option>Select</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
        <option value="status">Status</option>
      </select>
      <button className="btn btn-reset" onClick={handleReset}>
        Reset
      </button>
      <label>Status</label>
      <button className="btn btn-active" onClick={() =>  filterData("Active")}>Active</button>
      <button className="btn btn-inactive" onClick={() =>  filterData("Inactive")}>InActive</button>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Status</th>
            {!sort && <th>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].status}</td>
                  <td>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Home;
