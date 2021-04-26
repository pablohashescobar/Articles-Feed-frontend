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
