import * as actions from "../actions";
import * as types from "../actions/types";

import parsedStorage from "../utils/localStorage";

const initialState: types.ShowCreator = {
  showCreator: parsedStorage ? parsedStorage.showCreator.showCreator : false,
};

// const initialState: types.ShowCreator = {
//   showCreator: false,
// };

export const toggleCreatorReducer = (
  state: types.ShowCreator = initialState,
  action: types.ToggleCreator
) => {
  switch (action.type) {
    case actions.TOGGLE_CREATOR: {
      return { ...state, showCreator: !state.showCreator };
    }
    default:
      return state;
  }
};
