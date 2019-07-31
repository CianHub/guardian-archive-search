import * as actions from "../actions/action-types";

const initialState = {
  articles: null,
  loading: false
};

export const getArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ARTICLES_SUCCESS:
      return { ...state, articles: action.articles, loading: false };

    case actions.GET_ARTICLES_START: {
      return { ...state, loading: true };
    }

    case actions.GET_ARTICLES_FAIL: {
      return { ...state, loading: false };
    }

    case actions.CLEAR_ARTICLES: {
      return { ...state, articles: null };
    }

    default:
      return state;
  }
};
