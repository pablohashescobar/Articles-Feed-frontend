import ApiClient from "../../utils/ApiClient";
import * as articleTypes from "./types";
import { toast } from "react-toastify";

export const getAllArticles = () => async (dispatch) => {
  try {
    const res = await ApiClient().get("/articles");

    dispatch({
      type: articleTypes.GET_ALL_ARTICLES,
      payload: res.data,
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.GET_ALL_ARTICLES_ERROR,
    });
  }
};

export const getArticleById = (id) => async (dispatch) => {
  try {
    const res = await ApiClient().get(`/articles/${id}`);

    dispatch({
      type: articleTypes.GET_ARTICLE_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.GET_ARTICLE_BY_ID_ERROR,
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await ApiClient().put(`/articles/like/${id}`);
    const { data } = res;
    dispatch({
      type: articleTypes.UPDATE_LIKES,
      payload: { id, data },
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.UPDATE_LIKES_ERROR,
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await ApiClient().put(`/articles/unlike/${id}`);
    const { data } = res;
    dispatch({
      type: articleTypes.UPDATE_UNLIKES,
      payload: { id, data },
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.UPDATE_UNLIKES_ERROR,
    });
  }
};

export const blockArticle = (id, history) => async (dispatch) => {
  try {
    const res = await ApiClient().put(`/articles/block/${id}`);

    dispatch({
      type: articleTypes.BLOCK_ARTICLE,
      payload: res.data,
    });
    toast.info("Article Blocked Redirecting....", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => history.push("/dashboard"), 2000);
  } catch (error) {
    toast.error("Some error occurred please try again later", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.BLOCK_ARTICLE_ERROR,
    });
  }
};

export const getUserArticles = () => async (dispatch) => {
  try {
    const res = await ApiClient().get("/articles/me");

    dispatch({
      type: articleTypes.GET_USER_ARTICLES,
      payload: res.data,
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.GET_USER_ARTICLES_ERROR,
    });
  }
};

export const deleteUserArticle = (id) => async (dispatch) => {
  try {
    await ApiClient().delete(`/articles/${id}`);

    dispatch({
      type: articleTypes.DELETE_USER_ARTICLE,
      payload: id,
    });
    toast.info("Article Successfully deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.DELETE_USER_ARTICLE_ERROR,
    });
  }
};

export const createArticle = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await ApiClient().post("/articles/create", body, config);
    toast.success("Article Successfully created Redirecting ...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.CREATE_ARTICLE,
      payload: res.data,
    });
    setTimeout(() => history.push("/myarticles"), 2000);
  } catch (error) {
    console.log(error);
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.CREATE_ARTICLE_ERROR,
    });
  }
};

export const editArticle = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await ApiClient().put(`/articles/edit/${id}`, body, config);
    toast.success("Article Edited Successfully ", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.EDIT_ARTICLE,
      payload: res.data,
    });
  } catch (error) {
    toast.error("Some error occurred Please try again later", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: articleTypes.EDIT_ARTICLE_ERROR,
    });
  }
};
