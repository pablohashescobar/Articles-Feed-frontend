import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-1">404</h1>
      <p className="lead">The page your looking was not found</p>
      <hr className="my-4" />
      <p>Get back to home and start from there, Thank you</p>
      <p className="lead">
        <Link to="/" className="btn btn-primary btn-lg" role="button">
          Back to Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
