import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import moment from "moment";

import mockData from "./mockAccountData";
// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, { delayResponse: 1500 });

var localStorageKey = "AccountList";
var currentData = localStorage.getItem(localStorageKey);

if (!currentData) {
  localStorage.setItem(localStorageKey, JSON.stringify(mockData));
}

mock.onGet("api/account/list").reply(function (config) {
  let data = JSON.parse(localStorage.getItem(localStorageKey));

  let listData = data.map(({ id, accountNo }) => {
    return { id, accountNo };
  });

  return [200, listData];
});

mock.onGet("api/account/detail").reply(function (config) {
  const { params } = config;

  let data = JSON.parse(localStorage.getItem(localStorageKey));

  let targetData = data.find(({ id }) => id === params.id);

  if (!targetData) {
    return [404, `Not Found account with id = ${params.id}`];
  }

  return [200, targetData];
});

mock.onPost("api/transaction/transfer").reply(function (config) {
  const { params, data } = config;
  const { from, to } = params;
  const { amount, currency, description } = JSON.parse(data);

  let localData = JSON.parse(localStorage.getItem(localStorageKey));

  let fromAccountIndex = localData.findIndex(({ id }) => id === from);
  let toAccountIndex = localData.findIndex(({ id }) => id === to);

  if (fromAccountIndex < 0) {
    return [404, `Not Found account with id = ${from}.`];
  }

  if (toAccountIndex < 0) {
    return [404, `Not Found account with id = ${to}.`];
  }

  let fromAccount = localData[fromAccountIndex];
  let toAccount = localData[toAccountIndex];

  let timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

  if (fromAccount === toAccount) {
    return [400, "Cannot transfer to same account."];
  }

  if (fromAccount.balance < amount) {
    return [400, "Opps, you don't have enought balance for this transaction."];
  }

  fromAccount.balance -= amount;
  fromAccount.transactions.unshift({
    id: fromAccount.transactions.length + 1,
    timestamp,
    action: "Debit",
    currency,
    amount,
    description:
      (description ? description + " --- " : "") +
      `Debit ${currency} ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} to ${toAccount.accountNo}`,
  });

  toAccount.balance += amount;
  toAccount.transactions.unshift({
    id: toAccount.transactions.length + 1,
    timestamp,
    action: "Credit",
    currency,
    amount,
    description:
      (description ? description + " --- " : "") +
      `Credit ${currency} ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} from ${fromAccount.accountNo}`,
  });

  localData[fromAccountIndex] = fromAccount;
  localData[toAccountIndex] = toAccount;

  localStorage.setItem(localStorageKey, JSON.stringify(localData));

  return [200];
});
