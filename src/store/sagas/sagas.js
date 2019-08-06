import * as actions from "../actions/action-types";
import {
  getArticlesFail,
  getArticlesStart,
  getArticlesSuccess,
  getArticlesNextPageSuccess,
  getArticlesNextPageStart,
  getArticlesNextPageFail,
  clearArticlesStart,
  clearArticlesSuccess,
  getSectionsFail,
  getSectionsStart,
  getSectionsSuccess
} from "../actions/actions";

import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { removeDuplicateObjects } from "../../components/utils/removeDuplicateObjects";

export function* getArticlesSaga(action) {
  yield put(getArticlesStart());

  try {
    const articles = yield axios.get(
      "https://content.guardianapis.com/search?show-fields=starRating,sectionName,headline,webPublicationDate,trailText,thumbnail,short-url&page-size=50&show-tags=contributor&api-key=" +
        process.env.REACT_APP_API_KEY
    );
    yield put(
      getArticlesSuccess(
        articles.data.response.results,
        articles.data.response.pages
      )
    );
  } catch (err) {
    yield put(getArticlesFail(err));
  }
}

export function* getArticlesSearchSaga(action) {
  yield put(getArticlesStart());
  const page = action.page ? action.page : 1;
  const pageSize = action.pageSize ? action.pageSize : 50;
  const query = action.query ? "q=" + action.query + "&" : "";
  const section = action.section
    ? "&section=" + action.section.toLowerCase()
    : "";
  const order = action.order ? "&order-by=" + action.order : "";
  const toDate = action.toDate ? "&to-date=" + action.toDate : "";
  const fromDate = action.fromDate ? "&from-date=" + action.fromDate : "";

  try {
    const articles = yield axios.get(
      "https://content.guardianapis.com/search?" +
        query +
        "page=" +
        page +
        "&page-size=" +
        pageSize +
        order +
        fromDate +
        toDate +
        section +
        "&show-fields=starRating,headline,trailText,thumbnail,sectionName,webPublicationDate,short-url&show-tags=contributor&api-key=" +
        process.env.REACT_APP_API_KEY
    );
    yield put(
      getArticlesSuccess(
        articles.data.response.results,
        articles.data.response.pages
      )
    );
  } catch (err) {
    yield put(getArticlesFail(err));
  }
}

export function* watchArticles() {
  yield takeEvery(actions.GET_ARTICLES_SEARCH, getArticlesSearchSaga);
  yield takeEvery(actions.GET_ARTICLES_INIT, getArticlesSaga);
  yield takeEvery(actions.GET_NEXT_PAGE_ARTICLES, getArticlesNextPageSaga);
  yield takeEvery(actions.CLEAR_ARTICLES, clearArticlesSaga);
}

export function* watchSections() {
  yield takeEvery(actions.GET_SECTIONS, getSectionsSaga);
}

export function* clearArticlesSaga(action) {
  yield put(clearArticlesStart());
  yield put(clearArticlesSuccess());
}

export function* getArticlesNextPageSaga(action) {
  yield put(getArticlesNextPageStart());
  const currentPage =
    action.pages > action.currentPage
      ? action.currentPage + 1
      : action.currentPage;

  const pageSize = action.pageSize ? action.pageSize : 50;
  const query = action.query ? "q=" + action.query : "";
  const section = action.section
    ? "&section=" + action.section.toLowerCase()
    : "";
  const order = action.order ? "&order-by=" + action.order : "";
  const toDate = action.toDate ? "&to-date=" + action.toDate : "";
  const fromDate = action.fromDate ? "&from-date=" + action.fromDate : "";

  try {
    const articles = yield axios.get(
      "https://content.guardianapis.com/search?" +
        query +
        "&page-size=" +
        pageSize +
        order +
        fromDate +
        toDate +
        section +
        "&page=" +
        currentPage +
        "&show-fields=starRating,headline,trailText,thumbnail,sectionName,webPublicationDate,short-url&show-tags=contributor&api-key=" +
        process.env.REACT_APP_API_KEY
    );

    const combinedArticles = yield [
      ...action.articles,
      ...articles.data.response.results
    ];
    const newArticles = yield removeDuplicateObjects(combinedArticles);

    yield put(getArticlesNextPageSuccess(newArticles, currentPage));
  } catch (err) {
    yield put(getArticlesNextPageFail(err));
  }
}

export function* getSectionsSaga(action) {
  yield put(getSectionsStart());
  try {
    const response = yield axios.get(
      "https://content.guardianapis.com/sections?&api-key=0b4369b4-cc69-403a-9d7a-b6ade3c54167"
    );
    yield put(
      getSectionsSuccess(
        response.data.response.results.map(section => section.webTitle)
      )
    );
  } catch (error) {
    yield put(getSectionsFail(error));
  }
}
