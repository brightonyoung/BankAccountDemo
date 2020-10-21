import { TRANSFER_REQUEST } from "./types/index";

export const transfer = (from, to, data) => {
  return {
    type: TRANSFER_REQUEST,
    payload: { from, to, data },
  };
};
