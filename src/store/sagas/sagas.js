import * as actions from "../actions/action-types";
import { getArticles } from "../actions/actions";

import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

export function* getArticlesSaga(action) {
  const articles = yield axios.get(
    "https://content.guardianapis.com/search?api-key=0b4369b4-cc69-403a-9d7a-b6ade3c54167"
  );
  yield put(getArticles(articles));
}

export function* watchArticles() {
  yield takeEvery(actions.GET_ARTICLES_SAGA, getArticles);
}
