import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  ACCOUNT_LIST_FETCH_REQUEST,
  ACCOUNT_LIST_FETCH_SUCCESSFUL,
  ACCOUNT_LIST_FETCH_FAILED,
  ACCOUNT_DETAIL_FETCH_REQUEST,
  ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
  ACCOUNT_DETAIL_FETCH_FAILED,
} from "../actions/types";
import Api from "./apiHelper";
import errorMessageBuilder from "./webRequestHelper";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchAccountList(action) {
  try {
    const response = yield call(Api.fetchAccountList);

    const { data: responseData } = response;

    yield put({
      type: ACCOUNT_LIST_FETCH_SUCCESSFUL,
      payload: { data: responseData },
    });
  } catch (e) {
    console.error(e);
    let errorMessage = errorMessageBuilder(e);

    message.error(errorMessage);
    yield put({
      type: ACCOUNT_LIST_FETCH_FAILED,
      payload: { errorMessage },
    });
  }
}

export function* fetchAccountListSaga() {
  yield takeLatest(ACCOUNT_LIST_FETCH_REQUEST, fetchAccountList);
}

export function* fetchAccountDetail(action) {
  try {
    const response = yield call(Api.fetchAccountDetail, action.payload.id);
    const { data: responseData } = response;

    yield put({
      type: ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
      payload: { data: responseData },
    });
  } catch (e) {
    console.error(e);
    let errorMessage = errorMessageBuilder(e);

    message.error(errorMessage);
    yield put({
      type: ACCOUNT_DETAIL_FETCH_FAILED,
      payload: { errorMessage },
    });
  }
}

export function* fetchAccountDetailSaga() {
  yield takeLatest(ACCOUNT_DETAIL_FETCH_REQUEST, fetchAccountDetail);
}
