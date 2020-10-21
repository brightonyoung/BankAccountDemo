import {
  ACCOUNT_LIST_FETCH_REQUEST,
  ACCOUNT_DETAIL_FETCH_REQUEST,
} from "./types/index";

export const fetchAccountList = () => {
  return {
    type: ACCOUNT_LIST_FETCH_REQUEST,
  };
};

export const fetchAccountDetail = (id) => {
  return {
    type: ACCOUNT_DETAIL_FETCH_REQUEST,
    payload: { id },
  };
};