import { combineReducers } from "redux";
import { todoReducer } from "./todoReducer";
import { categoryReducer } from "./categoryReducer";
import { loginReducer } from "./loginReducer";
import { toggleCreatorReducer } from "./toggleCreatorReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: loginReducer,
  todos: todoReducer,
  category: categoryReducer,
  users: userReducer,
  showCreator: toggleCreatorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
