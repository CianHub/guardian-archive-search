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

export const getArticlesSuccess = (articles, numberOfPages, lastURL) => {
  return {
    type: actions.GET_ARTICLES_SUCCESS,
    articles,
    numberOfPages,
    lastURL
  };
};

export const clearArticles = () => {
  return {
    type: actions.CLEAR_ARTICLES
  };
};

export const clearArticlesStart = () => {
  return {
    type: actions.CLEAR_ARTICLES_START
  };
};

export const clearArticlesSuccess = () => {
  return {
    type: actions.CLEAR_ARTICLES_SUCCESS
  };
};

export const getArticlesFail = error => {
  return {
    type: actions.GET_ARTICLES_FAIL,
    error
  };
};

export const getArticlesNextPage = (pages, currentPage, query) => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES,
    currentPage,
    pages,
    query
  };
};

export const getArticlesNextPageStart = () => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES_START
  };
};

export const getArticlesNextPageSuccess = (articles, currentPage, lastURL) => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES_SUCCESS,
    articles,
    currentPage,
    lastURL
  };
};

export const getArticlesNextPageFail = error => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES_FAIL,
    error
  };
};
