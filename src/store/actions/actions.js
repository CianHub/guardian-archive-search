import * as actions from "./action-types";

export const getArticles = () => {
  return {
    type: actions.GET_ARTICLES_INIT
  };
};

export const getArticlesSearch = searchParams => {
  return {
    type: actions.GET_ARTICLES_SEARCH,
    ...searchParams
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

export const getArticlesNextPage = (
  pages,
  currentPage,
  query,
  section,
  order,
  toDate,
  fromDate,
  articles
) => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES,
    currentPage,
    pages,
    query,
    section,
    order,
    toDate,
    fromDate,
    articles
  };
};

export const getArticlesNextPageStart = () => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES_START
  };
};

export const getArticlesNextPageSuccess = (articles, currentPage) => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES_SUCCESS,
    articles,
    currentPage
  };
};

export const getArticlesNextPageFail = error => {
  return {
    type: actions.GET_NEXT_PAGE_ARTICLES_FAIL,
    error
  };
};

export const getSections = () => {
  return { type: actions.GET_SECTIONS };
};

export const getSectionsStart = () => {
  return { type: actions.GET_SECTIONS_START };
};

export const getSectionsSuccess = sections => {
  return {
    type: actions.GET_SECTIONS_SUCCESS,
    sections
  };
};

export const getSectionsFail = error => {
  return { type: actions.GET_SECTIONS_FAIL, error };
};
