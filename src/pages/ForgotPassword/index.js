import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { forgotPassword } from "../../actions/user";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    dispatch(forgotPassword(email));
  };

  //Redirect if logged in
  if (isAuthenticated && !loading) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container-sm mt-5" style={{ width: "450px" }}>
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
