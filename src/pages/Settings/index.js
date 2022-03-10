import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserSettings, verifyOTP, resendOTP } from "../../actions/user";
import { Link } from "react-router-dom";

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

const Settings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const defaultPreferenceValue = () => {
    let userPreferenceDefaultValues = [];
    for (const pre in user.article_preferences) {
      for (const values in options) {
        if (user.article_preferences[pre] === options[values].value) {
          userPreferenceDefaultValues.push(options[values]);
        }
      }
    }

    return userPreferenceDefaultValues;
  };

  const [dateOfBirth, setDateOfBirth] = useState(new Date(user.date_of_birth));
  const [articlePreferences, setArticlePreferences] = useState(
    defaultPreferenceValue()
  );
  const [formData, setFormData] = useState({
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    phone: String(user.phone),
    password: "",
    confirmPassword: "",
    confirmPasswordChange: false,
  });

  //FrontEnd form validation error
  const [formError, setFormError] = useState({
    msg: "",
    type: "",
  });
  const [otp, setOtp] = useState("");
  const handleOTPSubmit = (e) => {
    console.log("otp", otp);
    e.preventDefault();

    dispatch(verifyOTP(otp));
  };

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    confirmPasswordChange,
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

    if (confirmPasswordChange) {
      if (password.length < 1) {
        setFormError({ msg: "This Field Cannot be Empty", type: "password" });
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

    let userPreference = articlePreferences.map(
      (preference) => preference.value
    );

    const date = new Date(dateOfBirth);
    let userDob = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    let userData = {};

    if (confirmPasswordChange) {
      userData = {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        password,
        article_preferences: userPreference,
        date_of_birth: userDob,
      };
    } else {
      userData = {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        article_preferences: userPreference,
        date_of_birth: userDob,
      };
    }

    dispatch(editUserSettings(userData));
  };

  //Display in form errors
  const errorDisplay = (errMsg) => (
    <span className="text-danger">{errMsg}</span>
  );

  return (
    <div className="container-sm mt-5" style={{ width: "450px" }}>
      <h1 className="text-center">Settings</h1>
      {!loading && !user.is_verified ? (
        <div className="card-body">
          <div className="card p-3">
            <h4 className="card-title">Edit your personal information</h4>
            <form onSubmit={handleOTPSubmit}>
              <div className="form-group">
                <label htmlFor="OTP">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={e => setOtp(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="button" className="btn btn-secondary m-2" onClick={e => dispatch(resendOTP())}>
                Resend OTP
              </button>
            </form>
          </div>
        </div>
      ) : (<div className="card-body">
        <div className="card p-3">
          <h4 className="card-title">Edit your personal information</h4>
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
            <h5 className="card-title">Change your password</h5>
            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control p-3"
                id="Password"
                placeholder="Password"
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
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
              />
              {formError.type &&
                formError.type === "confirmPassword" &&
                errorDisplay(formError.msg)}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={confirmPasswordChange}
                value={confirmPasswordChange}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPasswordChange: !confirmPasswordChange,
                  })
                }
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I agree to change my password
              </label>
            </div>
            <div className="form-group mt-3">
              <Select
                options={options}
                isMulti
                defaultValue={defaultPreferenceValue()}
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
            <Link
              to="/dashboard"
              type="button"
              className="btn btn-primary px-4 py-2 m-3"
            >
              Go to Dashboard
            </Link>
            <button type="submit" className="btn btn-primary px-4 py-2 m-3">
              Edit
            </button>
          </form>
        </div>
      </div>)}

    </div>
  );
};

export default Settings;
