import axios from "axios";
import { getUserToken } from "./Token";

const ApiClient = () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL : process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "x-auth-token": getUserToken(),
    },
  });
};

export default ApiClient;
