import {
  TRANSFER_FAILED,
  TRANSFER_SUCCESSFUL,
  TRANSFER_REQUEST,
} from "../actions/types";

const INITIAL_STATE = {
  submitting: false,
  error: false,
  errorMessage: undefined,
};

//Placeholder for Redux
export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case TRANSFER_REQUEST:
      return {
        ...state,
        submitting: true,
        error: false,
        errorMessage: undefined,
      };
    case TRANSFER_SUCCESSFUL:
      return {
        ...state,
        submitting: false,
        error: false,
        errorMessage: undefined,
      };
    case TRANSFER_FAILED:
      return {
        ...state,
        submitting: false,
        error: true,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
