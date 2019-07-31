import * as actions from "./action-types";

export const getArticles = articles => {
  return {
    type: actions.GET_ARTICLES,
    articles
  };
};
