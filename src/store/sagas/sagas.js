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
      "https://content.guardianapis.com/search?api-key=0b4369b4-cc69-403a-9d7a-b6ade3c54167"
    );
    yield put(getArticlesSuccess(articles.data.response.results));
  } catch (err) {
    yield put(getArticlesFail(err));
  }
}

export function* getArticlesSearchSaga(action) {
  yield put(getArticlesStart());

  try {
    const articles = yield axios.get(
      "https://content.guardianapis.com/search?q=" +
        action.query +
        "api-key=0b4369b4-cc69-403a-9d7a-b6ade3c54167"
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
