import * as userTypes from "../../actions/user/types";
import { getUserToken } from "../../utils/Token";

const initialState = {
  token: getUserToken(),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case userTypes.REGISTER_SUCCESS:
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };

    case userTypes.EDIT_USER_SETTINGS:
    case userTypes.FOLLOW_USER:
      console.log("User", state.user);
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case userTypes.EDIT_USER_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
      };

    case userTypes.LOGIN_FAIL:
    case userTypes.REGISTER_FAIL:
    case userTypes.AUTH_ERROR:
    case userTypes.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
