import * as actions from "../actions";
import * as types from "../actions/types";

const initialState: types.Todos = {
  todos: [],
};

export const commentReducer = (
  state: types.Todos = initialState,
  action: types.AddComment
) => {
  switch (action.type) {
    case actions.ADD_COMMENT: {
      console.log(state);
      const todoIndex = state.todos.findIndex(
        (td) => td.id === action.payload.todoId
      );

      console.log(todoIndex);
      const currentTodos = [...state.todos];
      const newTodos = currentTodos[todoIndex].comments.push(
        action.payload.comment
      );

      return { ...state, todos: [...state.todos, newTodos] };
    }
    default:
      return state;
  }
};
