import * as actions from "../actions";
import * as types from "../actions/types";

export type UserState = {
  isAuthed: boolean;
  userName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  biography: string;
};

const initialState: UserState = {
  isAuthed: false,
  userName: "",
  fullName: "",
  email: "",
  profilePicture: "",
  biography: "",
};

export const loginReducer = (
  state: UserState = initialState,
  action: types.LoginType
): UserState => {
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
