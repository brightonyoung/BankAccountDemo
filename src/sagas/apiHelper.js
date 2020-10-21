import axios from "axios";

export default {
  fetchAccountList: () => {
    return axios.get("api/account/list");
  },
  fetchAccountDetail: (id) => {
    return axios.get("api/account/detail", {
      params: { id },
    });
  },
  transfer: (from, to, data) => {
    return axios.post("api/transaction/transfer", data, {
      params: {
        from,
        to,
      },
    });
  },
};
