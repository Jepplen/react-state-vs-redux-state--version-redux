import { combineReducers } from "redux";
import { addTodoReducer } from "./addTodoReducer";
import { categoryReducer } from "./categoryReducer";
import { commentReducer } from "./commentReducer";
import { loginReducer } from "./loginReducer";
import { notesReducer } from "./notesReducer";
import { toggleCreatorReducer } from "./toggleCreatorReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: loginReducer,
  todos: addTodoReducer,
  notes: notesReducer,
  category: categoryReducer,
  users: userReducer,
  //comments: commentReducer,
  showCreator: toggleCreatorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
