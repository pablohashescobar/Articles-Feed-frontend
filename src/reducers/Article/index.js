import * as articleTypes from "../../actions/article/types";
const initialState = {
  articles: [],
  article: null,
  loading: true,
  userArticles: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case articleTypes.GET_ALL_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false,
      };

    case articleTypes.GET_ARTICLE_BY_ID:
      return {
        ...state,
        article: payload,
        loading: false,
      };

    case articleTypes.UPDATE_LIKES:
      return {
        ...state,
        article: payload.data,
        loading: false,
      };

    case articleTypes.UPDATE_UNLIKES:
      return {
        ...state,
        article: payload.data,
        loading: false,
      };

    case articleTypes.BLOCK_ARTICLE:
      return {
        ...state,
        loading: false,
        articles: state.articles.filter((article) => article._id !== payload),
        article: null,
      };

    case articleTypes.GET_USER_ARTICLES:
      return {
        ...state,
        loading: false,
        userArticles: payload,
      };

    case articleTypes.DELETE_USER_ARTICLE:
      return {
        ...state,
        userArticles: state.userArticles.filter(
          (userArticle) => userArticle._id !== payload
        ),
        loading: false,
      };

    case articleTypes.CREATE_ARTICLE:
      return {
        ...state,
        userArticles: [payload, ...state.userArticles],
        loading: false,
      };

    case articleTypes.EDIT_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false,
      };

    case articleTypes.GET_USER_ARTICLES_ERROR:
    case articleTypes.DELETE_USER_ARTICLE_ERROR:
    case articleTypes.GET_ARTICLE_BY_ID_ERROR:
    case articleTypes.GET_ALL_ARTICLES_ERROR:
    case articleTypes.CREATE_ARTICLE_ERROR:
    case articleTypes.EDIT_ARTICLE_ERROR:
    case articleTypes.UPDATE_UNLIKES_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
