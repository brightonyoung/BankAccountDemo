import { message } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  TRANSFER_REQUEST,
  TRANSFER_SUCCESSFUL,
  TRANSFER_FAILED,
} from "../actions/types";
import Api from "./apiHelper";
import errorMessageBuilder from "./webRequestHelper";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* transfer(action) {
  try {
    const { from, to, data } = action.payload;
    const response = yield call(Api.transfer, from, to, data);

    const { data: responseData } = response;

    yield put({
      type: TRANSFER_SUCCESSFUL,
      payload: { data: responseData },
    });
  } catch (e) {
    console.error(e);
    let errorMessage = errorMessageBuilder(e);

    message.error(errorMessage);
    yield put({
      type: TRANSFER_FAILED,
      payload: { errorMessage },
    });
  }
}

export function* transferSaga() {
  yield takeLatest(TRANSFER_REQUEST, transfer);
}
