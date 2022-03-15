import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);

  return (
    <div className="jumbotron jumbotron-fluid mb-0" style={{ height: "100%" }}>
      <div className="container mt-4" style={{ height: "100%" }}>
        <h1 className="display-4" style={{ fontFamily: "Lobster, cursive" }}>
          Articles Feed
        </h1>
        <p className="lead">
          A way to great articles and personalised feed Login/Signup now to view
          your feed
        </p>
        <hr className="my-4" />
        <p style={{ fontSize: "2em" }}>
          <Typewriter
            options={{
              strings: [
                "Write what's on your mind.",
                "Read intersting articles.",
                "Supports <b>rich</b> <i>text.</i>",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 50,
            }}
          />
        </p>
        <div className="d-flex flex-row justify-content-center">
          {isAuthenticated && !loading ? (
            <p className="lead">
              <Link
                to="/dashboard"
                className="btn btn-primary btn-lg m-2"
                role="button"
              >
                Go to Dashboard
              </Link>
            </p>
          ) : (
            <>
              {" "}
              <p className="lead">
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg m-2"
                  role="button"
                >
                  Login
                </Link>
              </p>
              <p className="lead">
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg m-2"
                  role="button"
                >
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
