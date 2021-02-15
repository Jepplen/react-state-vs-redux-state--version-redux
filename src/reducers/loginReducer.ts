import * as actions from "../actions";
import * as types from "../actions/types";
import parsedStorage from "../utils/localStorage";

const initialState: types.UserState = {
  isAuthed: parsedStorage ? parsedStorage.user.isAuthed : false,
  userName: parsedStorage ? parsedStorage.user.userName : "",
  fullName: parsedStorage ? parsedStorage.user.fullName : "",
  email: parsedStorage ? parsedStorage.user.email : "",
  profilePicture: parsedStorage ? parsedStorage.user.profilePicture : "",
  biography: parsedStorage ? parsedStorage.user.biography : "",
};

// const initialState: types.UserState = {
//   isAuthed: false,
//   userName: "",
//   fullName: "",
//   email: "",
//   profilePicture: "",
//   biography: "",
// };

export const loginReducer = (
  state: types.UserState = initialState,
  action: types.LoginType
): types.UserState => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        isAuthed: true,
        userName: action.payload.userName,
        fullName: action.payload.fullName,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
        biography: action.payload.biography,
      };
    case actions.LOGOUT:
      return {
        isAuthed: false,
        userName: "",
        fullName: "",
        email: "",
        profilePicture: "",
        biography: "",
      };
    default:
      return state;
  }
};
