import * as actions from "../actions";
import * as types from "../actions/types";
import parsedStorage from "../utils/localStorage";

const initialState: types.Users = {
  users: parsedStorage ? parsedStorage.users.users : [],
};

// const initialState: types.Users = {
//   users: [],
// };

export const userReducer = (
  state: types.Users = initialState,
  action: types.LoginType
) => {
  switch (action.type) {
    case actions.ADD_USER: {
      return { ...state, users: [...state.users, action.payload] };
    }
    default:
      return state;
  }
};
