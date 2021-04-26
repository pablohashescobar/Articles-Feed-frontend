import axios from "axios";
import { getUserToken } from "./Token";

const ApiClient = () => {
  return axios.create({
    baseURL: "https://articles-feed-api.herokuapp.com/api",
    headers: {
      "x-auth-token": getUserToken(),
    },
  });
};

export default ApiClient;
