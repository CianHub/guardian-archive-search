import * as actions from "./action-types";

export const getArticles = () => {
  return {
    type: actions.GET_ARTICLES_INIT
  };
};

export const getArticlesSearch = query => {
  return {
    type: actions.GET_ARTICLES_SEARCH,
    query
  };
};

export const getArticlesStart = () => {
  return {
    type: actions.GET_ARTICLES_START
  };
};

export const getArticlesSuccess = articles => {
  return {
    type: actions.GET_ARTICLES_SUCCESS,
    articles
  };
};

export const getArticlesFail = error => {
  return {
    type: actions.GET_ARTICLES_FAIL,
    error
  };
};
