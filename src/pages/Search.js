import React, { useState, useEffect } from "react";
import { useLocation, Link} from "react-router-dom";
import { toast } from "react-toastify";
import appDb from "../firebase";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState({});
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

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

  let query = useQuery();
  let search = query.get("name");
  console.log(search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    appDb
      .child("contacts")
      .orderByChild("name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        } else {
          setData({});
        }
      });
  };

  return (
    <div className="container">
    <Link to="/">
    <button className="btn btn-edit">Go Back</button>
    </Link>
      {Object.keys(data).length === 0 ? (
        <h2 className="msg">
          {" "}
          No Record Found with this Name : {query.get("name")}
        </h2>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {Object.keys(data).map((id, index) => {
            return (
              <tbody>
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
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Search;
