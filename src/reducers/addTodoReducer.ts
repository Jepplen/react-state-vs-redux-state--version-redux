import * as actions from "../actions";
import * as types from "../actions/types";
import parsedStorage from "../utils/localStorage";

const initialState: types.Todos = {
  todos: parsedStorage ? parsedStorage.todos.todos : [],
};

// const initialState: types.Todos = {
//   todos: [],
// };

export const addTodoReducer = (
  state: types.Todos = initialState,
  action: types.AddTodo | any
) => {
  switch (action.type) {
    case actions.ADD_TODO: {
      return { ...state, todos: [...state.todos, action.payload.todo] };
    }
    case actions.ADD_COMMENT: {
      const todoIndex = state.todos.findIndex(
        (td) => td.id === action.payload.todoId
      );

      let currentTodos = [...state.todos];
      let newTodo = { ...currentTodos[todoIndex] };
      newTodo.comments.push(action.payload.comment);

      return {
        ...state,
        todos: [
          ...state.todos.slice(0, todoIndex),
          newTodo,
          ...state.todos.slice(todoIndex + 1),
        ],
      };
    }
    case actions.COMPLETE_TODO: {
      // const todoIndex = state.todos.findIndex(
      //   (td) => td.id === action.payload.id
      // );

      // let currentTodos = [...state.todos];
      // let newTodo = { ...currentTodos[todoIndex] };
      // let updatedTodo = { ...newTodo, completed: true };

      // console.log(updatedTodo);

      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.id === action.payload.id) {
              return { ...todo, completed: true };
            } else {
              return todo;
            }
          }),
        ],
      };

      // return {
      //   ...state,
      //   todos: [
      //     ...state.todos.slice(0, todoIndex),
      //     updatedTodo,
      //     ...state.todos.slice(todoIndex + 1),
      //   ],
      // };
    }
    case actions.DELETE_TODO: {
      console.log(action.payload.id);
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload.id)],
      };
    }
    default:
      return state;
  }
};
