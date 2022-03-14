import ApiClient from "../../utils/ApiClient";
import { storeUserToken, eraseUserToken } from "../../utils/Token";
import { toast } from "react-toastify";
import * as userTypes from "./types";

//Login User
export const loginUsingEmail = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await ApiClient().post("/auth/login/email", body, config);

    dispatch({
      type: userTypes.LOGIN_SUCCESS,
    });
    storeUserToken(res.data.token);
    dispatch(loadUser());
    toast.success("Welcome to Articles Feed", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    eraseUserToken();
    dispatch({
      type: userTypes.LOGIN_FAIL,
    });
  }
};

//Login User
export const loginUsingPhone = (phone, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ phone, password });

  try {
    const res = await ApiClient().post("/auth/login/phone", body, config);

    dispatch({
      type: userTypes.LOGIN_SUCCESS,
    });
    storeUserToken(res.data.token);
    dispatch(loadUser());
    toast.success("Welcome to Articles Feed", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    eraseUserToken();
    dispatch({
      type: userTypes.LOGIN_FAIL,
    });
  }
};

//Register a user
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await ApiClient().post("/users", body, config);

    dispatch({
      type: userTypes.REGISTER_SUCCESS,
    });
    storeUserToken(res.data.token);
    dispatch(loadUser());
    toast.success("Welcome to Articles Feed", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    eraseUserToken();
    dispatch({
      type: userTypes.REGISTER_FAIL,
    });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await ApiClient().get("/auth");
    dispatch({
      type: userTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    eraseUserToken();
    dispatch({ type: userTypes.AUTH_ERROR });
  }
};

export const logOut = () => (dispatch) => {
  eraseUserToken();
  dispatch({ type: userTypes.LOGOUT });
};

export const editUserSettings = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await ApiClient().put("/users/edit", body, config);

    dispatch({
      type: userTypes.EDIT_USER_SETTINGS,
      payload: res.data,
    });

    toast.success("Information Succesfully edited", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: userTypes.EDIT_USER_SETTINGS_ERROR,
    });
  }
};


//Follow a user by id
export const followUser = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    // const body = JSON.stringify(formData);

    const res = await ApiClient().put(`/users/follow/${id}`, config);

    dispatch({
      type: userTypes.FOLLOW_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({

      type: userTypes.EDIT_USER_SETTINGS_ERROR,
    });
  }
};


export const resendOTP = () => async (dispatch) => {
  try {
    const res = await ApiClient().get("/users/resend-otp");

    dispatch({
      type: userTypes.RESEND_OTP_SUCCESS,
      payload: res.data,
    });

    toast.success("OTP Sent to you email address", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: userTypes.RESEND_OTP_ERROR,
    });
  }
}

export const verifyOTP = (otp) => async (dispatch) => {
  try {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ otp });

    const res = await ApiClient().post("/users/verify-otp", body, config);

    dispatch({
      type: userTypes.VERIFY_OTP_SUCCESS,
      payload: res.data,
    });

    toast.success("OTP Verified", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  } catch (error) {

    const errors = error.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: userTypes.VERIFY_OTP_ERROR,
    });
  }
}


export const forgotPassword = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });

    const res = await ApiClient().post("/users/forgot-password", body, config);

    dispatch({
      type: userTypes.FORGOT_PASSWORD_SUCCESS,
      payload: res.data,
    });

    toast.success("Password reset link sent to your email address", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  } catch (error) {
    const errors = error.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: userTypes.FORGOT_PASSWORD_ERROR,
    });
  }
}

export const resetPassword = (password, confirmPassword, token, otp) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ password: password, confirm_password: confirmPassword });

    const res = await ApiClient().post(`/users/reset-password/${token}/${otp}`, body, config);

    dispatch({
      type: userTypes.RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });

    toast.success("Password reset successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    storeUserToken(res.data.token);
    dispatch(loadUser());

  } catch (error) {
    const errors = error.response.data.errors;

    if (errors && Array.isArray(errors)) {
      errors.forEach((error) =>
        toast.error(error.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
    } else {
      toast.error("Some error occurred please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: userTypes.RESET_PASSWORD_ERROR,
    });
  }
}