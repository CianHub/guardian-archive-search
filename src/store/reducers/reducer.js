import * as actions from "../actions/action-types";

const initialState = {
  articles: null
};

export const getArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ARTICLES:
      return { ...state, articles: actions.articles };

    default:
      return state;
  }
};
