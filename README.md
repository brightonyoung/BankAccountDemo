# Back account Management Tool

The Tool is built in ReactJS along with [Ant Design](https://ant.design/). Data flow is managed via Redux and Redux Saga. Recommend to install the Chrome extension [Redux Saga Dev Tools](https://chrome.google.com/webstore/detail/redux-saga-dev-tools/kclmpmjofefcpjlommdpokoccidafnbi?hl=en) so that you can easily monitor the data flow and request status.

The app is not connected to real Backend API but instead, we mock the API call in UI side so no need to reply on any backend development. The data is stored in localStorage so far.

So far it only support one Currency (i.e. HKD) but feasible to extend in the futher. Meanwhile there are default 3 accounts and cannot add new account via UI now.

## Get Started

### Install

For the first time, we need to install all required packages by

```sh
npm install
```

### Start

To start the app, run

```sh
npm start
```

It will be hosted in [http://localhost:3000](http://localhost:3000)

### API

Like mentioned in the description, all APIs are mocked and defined in `src/__mocks__/mockApi` folder and data are stored in localStorage which defined in `src/__mocks__/mockAccountData.js`.

If you would like to add more account, please feel free to change the data in `src/__mocks__/mockAccountData.js` and remember to clear the localStorage in your browser.

## Requirement

### Introduction

Summary: Implement a UI that accesses a backend API to manage bank accounts. The accounts will support credit facilities.

The UI, should:

- Display a list of the transactions for a single account
  - Fields:
    - Timestamp
    - Action (debit/credit)
    - Description
    - Amount
    - Currency
- Support multiple bank accounts, with a selector on the transaction page for selecting the account
  - Have a simple form with validation, for transferring funds from one account to another
  - Notes:
    - It should be implemented using React
    - You can use any tools / dependencies that fit your workflow
    - Please take your time, there is no time limit
    - Produce a solution that you are happy to be considered ‘nearly’ production quality
  - This means that I'd like to see tests and good quality, clean code that has been implemented
  - Technical debt is totally acceptable, as long as its reasonably explained
  - Monitoring, operations and deployment elements are not necessary
  - It's fine to provide a stub/simulator for the backend API
- You should provide a simple, runnable way to view a working example ○ I.e. a README.md with instructions similar to the below is acceptable:
  - Run npm install in the repository
  - Run npm run start_server in one terminal
  - Then npm run start_cypress_tests in another terminal
  - Control-c once finished
- Instructions along the lines of the below, will be an instant fail:
  - Download mysql
  - Download these 3rdparty dependencies
  - Then change these variables in an environment.ts file
  - Then point your browser at localhost:3000, goto x,y,z
- Delivery: As a link to a github repository
