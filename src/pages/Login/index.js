import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUsingEmail, loginUsingPhone } from "../../actions/user";
import { Link, Redirect } from "react-router-dom";

import {
  emailValidator,
  phoneValidator,
  passwordValidator,
} from "../../utils/validator";

const Login = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  //FrontEnd form validation error
  const [formError, setFormError] = useState({
    msg: "",
    type: "",
  });

  const { email, phone, password } = formData;

  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length < 1 && phone.length < 1) {
      setFormError({
        msg: "You need to enter either email or phone",
        type: "special",
      });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (phone.length < 1 && email.length > 1) {
      if (!emailValidator(email)) {
        setFormError({ msg: "Please Enter a valid email", type: "email" });
        setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
        return;
      }

      if (!passwordValidator(password)) {
        setFormError({
          msg: "Password should be minimum 6 characters",
          type: "password",
        });
        setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
        return;
      }

      dispatch(loginUsingEmail(email, password));
    } else if (email.length < 1 && phone.length > 1) {
      if (!phoneValidator(phone)) {
        setFormError({
          msg: "Please Enter a valid phone number",
          type: "phone",
        });
        setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
        return;
      }

      if (!passwordValidator(password)) {
        setFormError({
          msg: "Password should be minimum 6 characters",
          type: "password",
        });
        setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
        return;
      }

      dispatch(loginUsingPhone(phone, password));
    } else if (email.length > 1 && phone.length > 1) {
      if (!emailValidator(email)) {
        setFormError({ msg: "Please Enter a valid email", type: "email" });
        setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
        return;
      }

      if (!passwordValidator(password)) {
        setFormError({
          msg: "Password should be minimum 6 characters",
          type: "password",
        });
        setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
        return;
      }

      dispatch(loginUsingEmail(email, password));
    }
  };

  //Display in form errors
  const errorDisplay = (errMsg) => (
    <span className="text-danger">{errMsg}</span>
  );

  //Redirect if logged in
  if (isAuthenticated && !loading) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container-sm mt-5" style={{ width: "450px" }}>
      <div className="card-body">
        <div className="card p-3">
          <h2 className="card-title">Login to Articles Feed</h2>
          <p className="text-info">Login with your email or phone</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            {formError.type && formError.type === "special" && (
              <div className="alert alert-danger" role="alert">
                {formError.msg}
              </div>
            )}
            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control p-3"
                id="Email"
                placeholder="Email"
                name="email"
                disabled={phone.length}
                value={email}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "email" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-group mt-3">
              <input
                type="tel"
                className="form-control p-3"
                id="Phone"
                placeholder="Phone"
                name="phone"
                disabled={email.length}
                value={phone}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "phone" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control p-3"
                id="Password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "password" &&
                errorDisplay(formError.msg)}
            </div>
            <button type="submit" className="btn btn-primary px-4 py-2 m-3">
              Login
            </button>
            <p className="text-info">
              New to Articles Feed
              <Link to="/register" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
              now
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
