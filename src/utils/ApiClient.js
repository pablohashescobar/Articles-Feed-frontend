import axios from "axios";
import { getUserToken } from "./Token";

const ApiClient = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    headers: {
      "x-auth-token": getUserToken(),
    },
  });
};

export default ApiClient;
