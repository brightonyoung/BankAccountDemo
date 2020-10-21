import { runSaga } from "redux-saga";
import { takeLatest } from "redux-saga/effects";

import {
  TRANSFER_REQUEST,
  TRANSFER_SUCCESSFUL,
  TRANSFER_FAILED,
} from "../actions/types";
import { transfer, transferSaga } from "./transaction";
import Api from "./apiHelper";

jest.mock("moment", () => {
  return () => jest.requireActual("moment")("2020-01-01T00:00:00.000Z");
});

describe("transaction saga", () => {
  describe("transferSaga", () => {
    const genObject = transferSaga();

    it("should take latest TRANSFER_REQUEST action and call transferSaga", () => {
      expect(genObject.next().value).toEqual(
        takeLatest(TRANSFER_REQUEST, transfer)
      );
    });

    it("should be done on next iteration", () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe("transfer ", () => {
    it("should call api and dispatch success action", async () => {
      const dummyResponse = { data: { transferStatus: "done" } };
      const requestTransfer = jest
        .spyOn(Api, "transfer")
        .mockImplementation(() => Promise.resolve(dummyResponse));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        transfer,
        { payload: {} }
      );

      expect(requestTransfer).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: TRANSFER_SUCCESSFUL,
          payload: dummyResponse,
        },
      ]);
      requestTransfer.mockClear();
    });

    it("should call api and dispatch unexpected error action", async () => {
      const requestTransfer = jest
        .spyOn(Api, "transfer")
        .mockImplementation(() => Promise.reject("error"));
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        transfer,
        { payload: {} }
      );

      expect(requestTransfer).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: TRANSFER_FAILED,
          payload: {
            errorMessage: "2020-01-01 08:00:00 Unexpected Error: error",
          },
        },
      ]);
      requestTransfer.mockClear();
    });

    it("should call api and dispatch 404 error action", async () => {
      const requestTransfer = jest
        .spyOn(Api, "transfer")
        .mockImplementation(() =>
          Promise.reject({
            request: {
              status: 404,
              statusText: "Not Found",
              responseText: "Record is not found.",
            },
          })
        );
      const dispatched = [];
      const result = await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        transfer,
        { payload: {} }
      );

      expect(requestTransfer).toHaveBeenCalledTimes(1);
      expect(dispatched).toEqual([
        {
          type: TRANSFER_FAILED,
          payload: {
            errorMessage:
              "2020-01-01 08:00:00 Not Found (404 - Record is not found.)",
          },
        },
      ]);
      requestTransfer.mockClear();
    });
  });
});
