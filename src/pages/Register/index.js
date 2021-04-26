import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/user";
import { Link, Redirect } from "react-router-dom";

import DatePicker from "react-datepicker";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import {
  phoneValidator,
  emailValidator,
  passwordValidator,
} from "../../utils/validator";

const options = [
  { value: "sports", label: "Sports" },
  { value: "space", label: "Space" },
  { value: "automobile", label: "Automobile" },
  { value: "politics", label: "Politics" },
  { value: "myself", label: "Myself" },
];

const Register = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [articlePreferences, setArticlePreferences] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  //FrontEnd form validation error
  const [formError, setFormError] = useState({
    msg: "",
    type: "",
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  } = formData;

  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName.length < 1) {
      setFormError({ msg: "This Field Cannot be Empty", type: "firstName" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (lastName.length < 1) {
      setFormError({ msg: "This Field Cannot be Empty", type: "lastName" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (email.length < 1) {
      setFormError({ msg: "This Field Cannot be Empty", type: "email" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (phone.length < 1) {
      setFormError({ msg: "This Field Cannot be Empty", type: "phone" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (password.length < 1) {
      setFormError({ msg: "This Field Cannot be Empty", type: "password" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (dateOfBirth == null) {
      setFormError({ msg: "This Field Cannot be Empty", type: "dateOfBirth" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (articlePreferences == null || articlePreferences.length < 1) {
      setFormError({
        msg: "This Field Cannot be Empty",
        type: "articlePreferences",
      });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (!emailValidator(email)) {
      setFormError({ msg: "Please Enter a valid email", type: "email" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
      return;
    }

    if (!phoneValidator(phone)) {
      setFormError({ msg: "Please Enter a valid phone number", type: "phone" });
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

    if (confirmPassword !== password) {
      setFormError({ msg: "Passwords don't match", type: "confirmPassword" });
      setTimeout(() => setFormError({ msg: "", type: "" }), 3000);
    }

    let userPreference = articlePreferences.map(
      (preference) => preference.value
    );

    const date = new Date(dateOfBirth);
    let userDob = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    const userData = {
      firstname: firstName,
      lastname: lastName,
      email,
      phone: Number(phone),
      password,
      article_preferences: userPreference,
      date_of_birth: userDob,
    };

    dispatch(register(userData));
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
          <h4 className="card-title">Welcome to Articles Feed</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control p-3"
                id="FirstName"
                placeholder="First Name"
                required
                name="firstName"
                value={firstName}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "firstName" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control p-3"
                id="LastName"
                placeholder="Last Name"
                required
                name="lastName"
                value={lastName}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "lastName" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control p-3"
                id="Email"
                placeholder="Email"
                required
                name="email"
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
                required
                name="phone"
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
            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control p-3"
                id="ConfirmPassword"
                placeholder="Confirm Passowrd"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "confirmPassword" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-group mt-3">
              <Select
                options={options}
                isMulti
                onChange={setArticlePreferences}
                placeholder={"Article Preferences"}
              />
              {formError.type &&
                formError.type === "articlePreferences" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-group mt-3">
              <DatePicker
                className="date-picker"
                selected={dateOfBirth}
                placeholderText={"yyyy-mm-dd"}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-mm-dd"
              />
              {formError.type &&
                formError.type === "dateOfBirth" &&
                errorDisplay(formError.msg)}
            </div>
            <button type="submit" className="btn btn-primary px-4 py-2 m-3">
              Sign Up
            </button>
            <p className="text-info">
              Already have an account
              <Link to="/login" style={{ textDecoration: "none" }}>
                {" "}
                Sign In
              </Link>
              now
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
