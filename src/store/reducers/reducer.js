import * as actions from "../actions/action-types";

const initialState = {
  articles: null
};

export const getArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ARTICLES_SUCCESS:
      return { ...state, articles: action.articles };

    default:
      return state;
  }
};
