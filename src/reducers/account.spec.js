import {
  ACCOUNT_LIST_FETCH_REQUEST,
  ACCOUNT_LIST_FETCH_SUCCESSFUL,
  ACCOUNT_LIST_FETCH_FAILED,
  ACCOUNT_DETAIL_FETCH_REQUEST,
  ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
  ACCOUNT_DETAIL_FETCH_FAILED,
} from "../actions/types";
import reducer from "./account";

describe("account reducer", () => {
  let INITIAL_STATE;

  beforeEach(() => {
    INITIAL_STATE = {
      error: false,
      loading: true,
      errorMessage: undefined,
      accountList: [],
      activeAccountId: undefined,
      activeAccountDetail: undefined,
    };
  });

  it("should return defined INITAL_STATE", () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should handle ACCOUNT_LIST_FETCH_REQUEST", () => {
    expect(
      reducer([], {
        type: ACCOUNT_LIST_FETCH_REQUEST,
      })
    ).toEqual({
      error: false,
      loading: true,
      errorMessage: undefined,
    });
  });

  it("should handle ACCOUNT_LIST_FETCH_SUCCESSFUL", () => {
    expect(
      reducer([], {
        type: ACCOUNT_LIST_FETCH_SUCCESSFUL,
        payload: {
          data: [{ id: 1, text: "test" }],
        },
      })
    ).toEqual({
      loading: false,
      error: false,
      errorMessage: undefined,
      accountList: [{ id: 1, text: "test" }],
      activeAccountId: undefined,
      activeAccountDetail: undefined,
    });
  });

  it("should handle ACCOUNT_DETAIL_FETCH_REQUEST", () => {
    expect(
      reducer([], {
        type: ACCOUNT_DETAIL_FETCH_REQUEST,
        payload: {
          id: 1,
        },
      })
    ).toEqual({
      loading: true,
      error: false,
      errorMessage: undefined,
      activeAccountId: 1,
    });
  });

  it("should handle ACCOUNT_DETAIL_FETCH_SUCCESSFUL", () => {
    expect(
      reducer([], {
        type: ACCOUNT_DETAIL_FETCH_SUCCESSFUL,
        payload: {
          data: { id: 1, text: "test" },
        },
      })
    ).toEqual({
      loading: false,
      error: false,
      errorMessage: undefined,
      activeAccountDetail: { id: 1, text: "test" },
    });
  });

  it("should handle ACCOUNT_DETAIL_FETCH_FAILED", () => {
    expect(
      reducer([], {
        type: ACCOUNT_DETAIL_FETCH_FAILED,
        payload: {
          errorMessage: "something is wrong",
        },
      })
    ).toEqual({
      loading: false,
      error: true,
      errorMessage: "something is wrong",
    });
  });

  it("should handle ACCOUNT_LIST_FETCH_FAILED", () => {
    expect(
      reducer([], {
        type: ACCOUNT_LIST_FETCH_FAILED,
        payload: {
          errorMessage: "something is wrong",
        },
      })
    ).toEqual({
      loading: false,
      error: true,
      errorMessage: "something is wrong",
    });
  });
});
