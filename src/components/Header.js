import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch('');
  };

  return (
    <div className="header">
      <p className="logo">Contact App</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={activeTab === "Home" ? "active" : ""}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={activeTab === "AddContact" ? "active" : ""}
            onClick={() => setActiveTab("AddContact")}
          >
            Add Contact
          </p>
        </Link>
        <Link to="/about">
          <p
            className={activeTab === "About" ? "active" : ""}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
        <form onSubmit={handleSubmit} className="searchForm">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
