import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { resetPassword } from "../../actions/user";
import { toast } from "react-toastify";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { password, confirmPassword } = formData;

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same");

      return setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
    }

    dispatch(
      resetPassword(
        password,
        confirmPassword,
        match.params.token,
        match.params.otp
      )
    );
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
          <label htmlFor="password" className="m-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="password"
            placeholder="Enter password"
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="confirm-password" className="m-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            aria-describedby="confirm-password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
