import { styled } from "@glitz/react";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";
import { useState } from "react";
import TodoPost from "./TodoPost";
// import { ChangeEvent, useState } from "react";
// import { connect } from "react-redux";
// import * as types from "../actions/types";
// import * as actions from "../actions";

const Main: React.FC = () => {
  const [postShouldShow, setPostShouldShow] = useState(false);
  const [postId, setPostId] = useState(0);

  const setPost = (value: boolean, id: number) => {
    setPostShouldShow(value);
    setPostId(id);
  };

  return (
    <MainContent style={{ borderTop: "1px solid white" }}>
      {postShouldShow ? (
        <TodoPost closePost={setPost} postId={postId} />
      ) : (
        <TodoCreatorContainer>
          <TodoCreator />
          <TodoList openPost={setPost} postId={postId} />
        </TodoCreatorContainer>
      )}
    </MainContent>
  );
};

const Top = styled.div({
  height: "25px",
  width: "100%",
  backgroundColor: "#353446",
  position: "relative",
  zIndex: 1,
});

const TodoCreatorContainer = styled.div({
  width: "100vw",
  //height: "80vh",
  backgroundColor: "#353446",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  // margin: {
  //   top: "50px",
  // },
});

const MainContent = styled.div({
  padding: {
    top: "25px",
    bottom: "50px",
  },
  width: "100vw",
  minHeight: "67vh",
  backgroundColor: "#353446",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  // margin: {
  //   top: "50px",
  // },
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
