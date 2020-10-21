import {
  ACCOUNT_LIST_FETCH_REQUEST,
  ACCOUNT_LIST_FETCH_SUCCESSFUL,
  ACCOUNT_LIST_FETCH_FAILED,
  ACCOUNT_DETAIL_FETCH_REQUEST,
  ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
  ACCOUNT_DETAIL_FETCH_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  error: false,
  loading: true,
  errorMessage: undefined,
  accountList: [],
  activeAccountId: undefined,
  activeAccountDetail: undefined,
};

//Placeholder for Redux
export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNT_LIST_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: undefined,
      };
    case ACCOUNT_LIST_FETCH_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: undefined,
        accountList: payload.data,
        activeAccountId: undefined,
        activeAccountDetail: undefined,
      };
    case ACCOUNT_DETAIL_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: undefined,
        activeAccountId: payload.id,
      };
    case ACCOUNT_DETAIL_FETCH_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: undefined,
        activeAccountDetail: payload.data,
      };
    case ACCOUNT_DETAIL_FETCH_FAILED:
    case ACCOUNT_LIST_FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
