import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";

const rootReducer = combineReducers({
  user: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
