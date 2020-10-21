import {
  TRANSFER_FAILED,
  TRANSFER_SUCCESSFUL,
  TRANSFER_REQUEST,
} from "../actions/types";

import reducer from "./transaction";

describe("transaction reducer", () => {
  let INITIAL_STATE;

  beforeEach(() => {
    INITIAL_STATE = {
      submitting: false,
      error: false,
      errorMessage: undefined,
    };
  });

  it("should return defined INITAL_STATE", () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should handle TRANSFER_REQUEST", () => {
    expect(
      reducer([], {
        type: TRANSFER_REQUEST,
      })
    ).toEqual({
      submitting: true,
      error: false,
      errorMessage: undefined,
    });
  });

  it("should handle TRANSFER_SUCCESSFUL", () => {
    expect(
      reducer([], {
        type: TRANSFER_SUCCESSFUL,
      })
    ).toEqual({
      submitting: false,
      error: false,
      errorMessage: undefined,
    });
  });

  it("should handle TRANSFER_FAILED", () => {
    expect(
      reducer([], {
        type: TRANSFER_FAILED,
        payload: {
          errorMessage: "something is wrong",
        },
      })
    ).toEqual({
      submitting: false,
      error: true,
      errorMessage: "something is wrong",
    });
  });
});
