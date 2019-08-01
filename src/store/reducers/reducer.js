import * as actions from "../actions/action-types";

const initialState = {
  articles: null,
  loading: false,
  currentPage: 1,
  numberOfPages: null,
  loadingNextPage: false,
  lastURL: null
};

export const getArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        loading: false,
        numberOfPages: action.numberOfPages,
        currentPage: 1
      };

    case actions.GET_ARTICLES_START: {
      return { ...state, loading: true };
    }

    case actions.GET_ARTICLES_FAIL: {
      return { ...state, loading: false };
    }

    case actions.GET_NEXT_PAGE_ARTICLES_SUCCESS:
      const articles = [...state.articles, ...action.articles];
      return {
        ...state,
        articles: articles,
        currentPage: action.currentPage,
        loadingNextPage: false
      };

    case actions.GET_NEXT_PAGE_ARTICLES_START: {
      return { ...state, loadingNextPage: true };
    }

    case actions.GET_NEXT_PAGE_ARTICLES_FAIL: {
      return { ...state, loadingNextPage: false };
    }
    case actions.CLEAR_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: null,
        loading: false,
        currentPage: 1,
        numberOfPages: null
      };

    case actions.CLEAR_ARTICLES_START: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }
};
