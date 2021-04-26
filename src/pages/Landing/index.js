import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container mt-4">
        <h1 className="display-4">Articles Feed</h1>
        <p className="lead">
          A way to great articles and personalised feed Login/Signup now to view
          your feed
        </p>
        <hr className="my-4" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500
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
