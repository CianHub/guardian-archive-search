import * as actions from "../actions/action-types";
import {
  getArticlesFail,
  getArticlesStart,
  getArticlesSuccess
} from "../actions/actions";

import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

export function* getArticlesSaga(action) {
  yield put(getArticlesStart());

  try {
    const articles = yield axios.get(
      "https://content.guardianapis.com/search?show-fields=starRating,headline,trailText,thumbnail,short-url&page-size=50&api-key=0b4369b4-cc69-403a-9d7a-b6ade3c54167"
    );
    yield put(getArticlesSuccess(articles.data.response.results));
  } catch (err) {
    yield put(getArticlesFail(err));
  }
}

export function* getArticlesSearchSaga(action) {
  yield put(getArticlesStart());
  const page = action.page ? action.page : 1;
  const pageSize = action.pageSize ? action.pageSize : 50;
  try {
    const articles = yield axios.get(
      "https://content.guardianapis.com/search?q=" +
        action.query +
        "page=" +
        page +
        "&" +
        "page-size=" +
        pageSize +
        "&" +
        "show-fields=starRating,headline,trailText,thumbnail,short-url&api-key=0b4369b4-cc69-403a-9d7a-b6ade3c54167"
    );
    yield put(getArticlesSuccess(articles.data.response.results));
  } catch (err) {
    yield put(getArticlesFail(err));
  }
}

export function* watchArticles() {
  yield takeEvery(actions.GET_ARTICLES_SEARCH, getArticlesSearchSaga);
  yield takeEvery(actions.GET_ARTICLES_INIT, getArticlesSaga);
}
