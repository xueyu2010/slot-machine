import { combineReducers } from "redux";
// import all the reducers herer
import slot from "./slotReducer";

const rootReducer = combineReducers({
  slot
});

export default rootReducer;
