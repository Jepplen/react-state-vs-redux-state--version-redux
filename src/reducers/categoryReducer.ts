import * as actions from "../actions";
import * as types from "../actions/types";
// import parsedStorage from "../utils/localStorage";

// const initialState: types.Category = {
//   category: parsedStorage ? parsedStorage.category.category : "All",
// };

const initialState: types.Category = {
  category: "All",
};

export const categoryReducer = (
  state: types.Category = initialState,
  action: types.SetCategory
) => {
  switch (action.type) {
    case actions.SET_CATEGORY: {
      return { category: action.payload };
    }
    default:
      return state;
  }
};
