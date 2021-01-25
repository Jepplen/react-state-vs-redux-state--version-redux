import { styled } from "@glitz/react";
// import { ChangeEvent, useState } from "react";
// import { connect } from "react-redux";
// import * as types from "../actions/types";
// import * as actions from "../actions";

const Main: React.FC = () => {
  return <MainContent>Main</MainContent>;
};

const MainContent = styled.div({
  width: "100vw",
  height: "80vh",
  backgroundColor: "beige",
});

export default Main;
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
