import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../actions/user";
import "./index.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);

  return (
    <nav className="navbar navbar-light py-1 px-4 subtle-shadow">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Articles Feed</span>
        </Link>
        {isAuthenticated && !loading ? (
          <div style={{ float: "right", marginRight: "5%" }}>
            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ color: "#0060B6", textDecoration: "none" }}
              >
                <span className="navbar-brand mb-0 h4">
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </span>
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  to="/dashboard"
                  className="dropdown-item"
                  style={{
                    color: "#0060B6",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  style={{
                    color: "#0060B6",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Settings
                </Link>
                <Link
                  to="/myarticles"
                  className="dropdown-item"
                  style={{
                    color: "#0060B6",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  My Articles
                </Link>
                <span
                  className="dropdown-item"
                  style={{
                    color: "#0060B6",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  onClick={() => dispatch(logOut())}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ float: "right" }}>
            <Link to="/" style={{ color: "#0060B6", textDecoration: "none" }}>
              <span className="navbar-brand mb-0 h4" style={{ color: "white" }}>
                Home
              </span>
            </Link>
            <Link
              to="/login"
              style={{ color: "#0060B6", textDecoration: "none" }}
            >
              <span className="navbar-brand mb-0 h4" style={{ color: "white" }}>
                Login
              </span>
            </Link>
            <Link
              to="/register"
              style={{ color: "#0060B6", textDecoration: "none" }}
            >
              <span className="navbar-brand mb-0 h4" style={{ color: "white" }}>
                Signup
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
