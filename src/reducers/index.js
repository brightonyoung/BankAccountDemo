import { combineReducers } from "redux";

import account from "./account";
import transaction from "./transaction";

//Placeholder for redux.
const rootReducer = combineReducers({ account, transaction });

export default rootReducer;
