import { runSaga } from "redux-saga";
import { takeLatest } from "redux-saga/effects";

import {
  ACCOUNT_LIST_FETCH_REQUEST,
  ACCOUNT_LIST_FETCH_SUCCESSFUL,
  ACCOUNT_LIST_FETCH_FAILED,
  ACCOUNT_DETAIL_FETCH_REQUEST,
  ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
  ACCOUNT_DETAIL_FETCH_FAILED,
} from "../actions/types";
import {
  fetchAccountList,
  fetchAccountListSaga,
  fetchAccountDetail,
  fetchAccountDetailSaga,
} from "./account";
import Api from "./apiHelper";

jest.mock("moment", () => {
  return () => jest.requireActual("moment")("2020-01-01T00:00:00.000Z");
});

describe("account saga", () => {
  describe("fetchAccountListSaga", () => {
    const genObject = fetchAccountListSaga();

    it("should take latest ACCOUNT_LIST_FETCH_REQUEST action and call fetchAccountList", () => {
      expect(genObject.next().value).toEqual(
        takeLatest(ACCOUNT_LIST_FETCH_REQUEST, fetchAccountList)
      );
    });

    it("should be done on next iteration", () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe("fetchAccountList", () => {
    it("should call api and dispatch success action", async () => {
      const dummyResponse = { data: { accountStatus: "ok" } };
      const requestFetchAccountList = jest
        .spyOn(Api, "fetchAccountList")
        .mockImplementation(() => Promise.resolve(dummyResponse));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAccountList,
        { payload: {} }
      );

      expect(requestFetchAccountList).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: ACCOUNT_LIST_FETCH_SUCCESSFUL,
          payload: dummyResponse,
        },
      ]);
      requestFetchAccountList.mockClear();
    });

    it("should call api and dispatch unexpected error action", async () => {
      const requestFetchAccountList = jest
        .spyOn(Api, "fetchAccountList")
        .mockImplementation(() => Promise.reject("error"));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAccountList,
        { payload: {} }
      );

      expect(requestFetchAccountList).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: ACCOUNT_LIST_FETCH_FAILED,
          payload: {
            errorMessage: "2020-01-01 08:00:00 Unexpected Error: error",
          },
        },
      ]);
      requestFetchAccountList.mockClear();
    });
  });

  describe("fetchAccountDetailSaga", () => {
    const genObject = fetchAccountDetailSaga();

    it("should take latest ACCOUNT_DETAIL_FETCH_REQUEST action and call fetchAccountDetail", () => {
      expect(genObject.next().value).toEqual(
        takeLatest(ACCOUNT_DETAIL_FETCH_REQUEST, fetchAccountDetail)
      );
    });

    it("should be done on next iteration", () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe("fetchAccountDetail", () => {
    it("should call api and dispatch success action", async () => {
      const dummyResponse = { data: { accountStatus: "ok" } };
      const requestFetchAccountDetail = jest
        .spyOn(Api, "fetchAccountDetail")
        .mockImplementation(() => Promise.resolve(dummyResponse));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAccountDetail,
        { payload: {} }
      );

      expect(requestFetchAccountDetail).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
          payload: dummyResponse,
        },
      ]);
      requestFetchAccountDetail.mockClear();
    });

    it("should call api and dispatch unexpected error action", async () => {
      const requestFetchAccountDetail = jest
        .spyOn(Api, "fetchAccountDetail")
        .mockImplementation(() => Promise.reject("error"));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAccountDetail,
        { payload: {} }
      );

      expect(requestFetchAccountDetail).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: ACCOUNT_DETAIL_FETCH_FAILED,
          payload: {
            errorMessage: "2020-01-01 08:00:00 Unexpected Error: error",
          },
        },
      ]);
      requestFetchAccountDetail.mockClear();
    });
  });
});
