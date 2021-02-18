import { styled } from "@glitz/react";
import { ChangeEvent, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import * as types from "../actions/types";
import * as actions from "../actions";
import { RootState } from "../reducers";
import axios from "axios";

// type User = {
//   userName: string;
//   fullName: string;
//   email: string;
//   profilePicture: string;
//   biography: string;
// };

type Props = {
  LOGIN: (
    userName: string,
    fullName: string,
    email: string,
    profilePicture: string,
    biography: string
  ) => types.LoginType;
  LOGOUT: (
    userName: string,
    fullName: string,
    email: string,
    profilePicture: string,
    biography: string
  ) => types.LoginType;
  //userState: UserState;
  isAuthed: boolean;
  userName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  biography: string;
};

const Login: React.FC<Props> = ({
  LOGIN,
  LOGOUT,
  isAuthed,
  userName,
  fullName,
  email,
  profilePicture,
  biography,
}) => {
  const [value, setValue] = useState("");
  const usersState = useSelector<RootState, types.Users["users"]>(
    (state) => state.users.users
  );
  const dispatch = useDispatch();
  const addUser = (userData: types.User) => {
    dispatch({ type: actions.ADD_USER, payload: userData });
  };

  console.log(usersState);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const user of usersState) {
      if (user.userName.toLowerCase() === value.toLowerCase()) {
        setProfile(user);
        return;
      }
    }
    getProfile();
  };

  const getProfile = () => {
    axios
      .get("https://randomuser.me/api/?gender=male")
      .then((response) => {
        console.log(response.data);

        // gender = response.data.results[0].gender

        const user: types.User = {
          userName: value,
          fullName: `${value} ${response.data.results[0].name.last}`,
          email: `${value.toLowerCase()}.${response.data.results[0].name.last.toLowerCase()}@webdevs.com`,
          profilePicture: response.data.results[0].picture.large,
          biography:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        };
        setProfile(user);
        addUser(user);
      })
      .catch((err) => console.error(err));
  };

  const setProfile = (user: types.User) => {
    LOGIN(
      user.userName,
      user.fullName,
      user.email,
      user.profilePicture,
      user.biography
    );

    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleLogout = () => {
    LOGOUT(userName, fullName, email, profilePicture, biography);
  };

  return (
    <Content>
      {isAuthed ? (
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      ) : (
        <Form onSubmit={handleSubmit}>
          <InputUserName
            value={value}
            onChange={handleChange}
            placeholder={"Enter your first name"}
            required
          />
          <LoginBtn type={"submit"}>Login</LoginBtn>
        </Form>
      )}
    </Content>
  );
};

const LogoutBtn = styled.button({
  width: "75px",
  height: "25px",
  backgroundColor: "#50646D",
  color: "white",
  border: {
    xy: {
      color: "none",
      width: "none",
      style: "none",
    },
  },
  borderRadius: "5px",
  outline: { style: "none" },
  ":hover": {
    backgroundColor: "#88CAD9",
  },
  ":active": {
    backgroundColor: "#3E7E8F",
  },
});

const mapStateToProps = (state: RootState): types.UserState => {
  return {
    isAuthed: state.user.isAuthed,
    userName: state.user.userName,
    fullName: state.user.fullName,
    email: state.user.email,
    profilePicture: state.user.profilePicture,
    biography: state.user.biography,
  };
};

const mapDispatchToProps = {
  LOGIN: (
    userName: string,
    fullName: string,
    email: string,
    profilePicture: string,
    biography: string
  ) => ({
    type: actions.LOGIN,
    payload: {
      userName: userName,
      fullName: fullName,
      email: email,
      profilePicture: profilePicture,
      biography: biography,
    },
  }),
  LOGOUT: (
    userName: string,
    fullName: string,
    email: string,
    profilePicture: string,
    biography: string
  ) => ({
    type: actions.LOGOUT,
    payload: {
      userName: userName,
      fullName: fullName,
      email: email,
      profilePicture: profilePicture,
      biography: biography,
    },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const Content = styled.div({});
const Form = styled.form({
  width: "200px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const InputUserName = styled.input({});
const LoginBtn = styled.button({
  marginLeft: "10px",
  width: "125px",
  height: "25px",
  backgroundColor: "#50646D",
  color: "white",
  border: {
    xy: {
      color: "none",
      width: "none",
      style: "none",
    },
  },
  borderRadius: "5px",
  outline: { style: "none" },
  ":hover": {
    backgroundColor: "#88CAD9",
  },
  ":active": {
    backgroundColor: "#3E7E8F",
  },
});

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     loginReducer: (username: string) =>
//       dispatch({ type: actions.LOGIN, payload: { username: username } }),
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     authUser: (username: string) => dispatch({type: actions.LOGIN, payload: username}),
//     decrement: (num) => dispatch(actions.decrement(num)),
//     addBug: () => dispatch(actions.addBug()),
//     removeBug: (id) => dispatch(actions.removeBug(id)),
//     resolveBug: (id) => dispatch(actions.resolveBug(id)),
//   };
// };
