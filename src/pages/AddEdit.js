import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import appDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input feild");
    } else {
      appDb.child("contacts").push(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Added Successfully" );
        }
      });
      setTimeout(() => navigate("/"), 800);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div className="formArea">
      <form className="formData" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact No."
          value={contact}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddEdit;
