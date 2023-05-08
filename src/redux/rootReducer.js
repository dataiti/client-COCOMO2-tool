import { combineReducers } from "redux";
import caculateReducer from "./features/caculateSlice";
import authReducer from "./features/caculateSlice";

const rootReducer = combineReducers({
  calculate: caculateReducer,
  auth: authReducer,
});

export default rootReducer;
