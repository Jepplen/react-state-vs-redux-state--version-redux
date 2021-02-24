import { styled } from "@glitz/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import * as types from "../actions/types";
import * as actions from "../actions";
import { useState, useEffect, FormEvent } from "react";
import { getIcon, humanizeTime } from "../utils/utils";
import CommentCard from "./CommentCard";
import React from "react";
import ProfileModal from "./ProfileModal";

const emptyUser: types.User = {
  userName: "",
  fullName: "",
  email: "",
  profilePicture: "",
  biography: "",
};

type Props = {
  closePost: (value: boolean, postId: number) => void;
  postId: number;
};

const TodoPost: React.FC<Props> = ({ closePost, postId }) => {
  const todos = useSelector<RootState, types.Todos["todos"]>(
    (state) => state.todos.todos
  );
  const users = useSelector<RootState, types.Users["users"]>(
    (state) => state.users.users
  );
  const currentUser = useSelector<RootState, types.User>((state) => state.user);
  const userState = useSelector<RootState, types.UserState>(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const addComment = (comment: types.AddComment) => {
    dispatch(comment);
  };
  const completeTodo = (completed: types.CompleteTodo) => {
    dispatch(completed);
  };

  const [todo, setTodo] = useState<types.Todo>();
  const [author, setAuthor] = useState<types.User>();
  const [, setUser] = useState<types.User>();
  const [commentUser, setCommentUser] = useState<types.User>();
  const [showProfile, setShowProfile] = useState(false);
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ce: types.Comment = {
      comment: input,
      timeStamp: Date.now(),
      authorUserName: currentUser.userName,
    };

    const cm: types.AddComment = {
      type: actions.ADD_COMMENT,
      payload: {
        todoId: postId,
        comment: ce,
      },
    };
    addComment(cm);

    setInput("");
  };

  useEffect(() => {
    setUser(currentUser);
    const todoFiltered = todos.find((td) => td.id === postId);
    setTodo(todoFiltered);
    const authorFiltered = users.find(
      (user) => user.userName === todoFiltered!.authorUserName
    );
    setAuthor(authorFiltered);
  }, [todos, postId, users, currentUser]);

  if (!todo) {
    return <div />;
  }

  const loadProfile = (user: types.User) => {
    setCommentUser(user);
    setShowProfile(true);
  };

  const closeModal = () => {
    setShowProfile(false);

    setCommentUser(emptyUser);
  };

  // if (showProfile) {
  //   if (commentUser) {
  //     return (
  //       <Content>
  //         <ProfileModal user={commentUser} close={closeModal} />
  //       </Content>
  //     );
  //   }
  // }

  const handleCompleteTodo = () => {
    const completed: types.CompleteTodo = {
      type: actions.COMPLETE_TODO,
      payload: {
        id: todo.id,
        completed: true,
      },
    };

    completeTodo(completed);
  };

  return (
    <Content>
      <PostContainer>
        <Header>
          <IconContainer>
            <Icon>
              {getIcon(todo.category, 30)}
              {todo.category}
            </Icon>
          </IconContainer>
          <TitleContainer>{todo.title}</TitleContainer>
          <BackBtn onClick={() => closePost(false, 0)}>Back</BackBtn>
        </Header>
        <Main>
          <MainText>{todo.description}</MainText>
        </Main>
        <Footer>
          <FooterProfilePic src={author?.profilePicture} />
          <FooterText>
            <FooterAuthor onClick={() => loadProfile(author!)}>
              by {todo.authorUserName}
            </FooterAuthor>
            <FooterDate>{humanizeTime(todo.timeStamp)}</FooterDate>
          </FooterText>
        </Footer>
        {todo.completed ? (
          <CompletedTodoText>Completed</CompletedTodoText>
        ) : (
          <CompleteTodoBtn onClick={handleCompleteTodo}>
            Complete quest
          </CompleteTodoBtn>
        )}
      </PostContainer>
      {userState.isAuthed ? (
        <NewCommentContainer onSubmit={handleSubmit}>
          <NewCommentProfilePic src={currentUser?.profilePicture} />
          <NewCommentInput
            onChange={handleChange}
            value={input}
            placeholder={"Add a comment"}
          />
          <NewCommentBtn>Comment</NewCommentBtn>
        </NewCommentContainer>
      ) : (
        <NotLoggedIn>
          <NotLoggedText>You need to login to comment on a post.</NotLoggedText>
        </NotLoggedIn>
      )}
      <CommentsContainer>
        {todo.comments.length > 0 ? (
          todo.comments.map((comment) => {
            let commentProfile = users.find(
              (u) => u.userName === comment.authorUserName
            );

            return (
              <CommentCard
                key={comment.timeStamp}
                loadProfile={loadProfile}
                comment={comment}
                profile={commentProfile ? commentProfile : emptyUser}
              />
            );
          })
        ) : (
          <p style={{ color: "white" }}>
            No comments, be the first to write one
          </p>
        )}
      </CommentsContainer>
      {showProfile && <ProfileModal user={commentUser!} close={closeModal} />}
    </Content>
  );
};

export default TodoPost;

const Icon = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
});

const IconContainer = styled.div({
  position: "relative",
  width: "70px",
  height: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#21A5C2",
  border: {
    xy: {
      width: "1px",
      color: "#50646D",
      style: "solid",
    },
  },

  borderRadius: "5%",
  boxSizing: "border-box",
  padding: {
    xy: "10px",
  },
  fontSize: "12px",
});

const CompletedTodoText = styled.p({
  padding: {
    y: "2px",
  },
  backgroundColor: "green",
  color: "white",
  margin: { xy: "0", top: "10px", bottom: "1px" },
  textAlign: "center",
  borderRadius: "5px",
  border: {
    xy: {
      width: "1px",
      color: "#50646D",
      style: "solid",
    },
  },
  boxSizing: "border-box",
  fontSize: "14px",
});

const CompleteTodoBtn = styled.button({
  width: "100%",
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
  margin: {
    top: "10px",
  },
});

const CommentsContainer = styled.div({
  width: "100%",
  //height: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  margin: {
    top: "5px",
    bottom: "10px",
  },
  padding: {
    x: "10px",
    y: "10px",
  },
  boxSizing: "border-box",
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: "5px",
});

const NotLoggedText = styled.p({
  color: "white",
});

const NotLoggedIn = styled.div({
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  margin: {
    top: "5px",
    bottom: "10px",
  },
  padding: {
    x: "10px",
    y: "10px",
  },
  boxSizing: "border-box",
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: "5px",
});

const NewCommentContainer = styled.form({
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-around",

  margin: {
    top: "5px",
    bottom: "10px",
  },
  padding: {
    x: "10px",
    y: "10px",
  },
  boxSizing: "border-box",
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: "5px",
});

const NewCommentProfilePic = styled.img({
  width: "7%",
  borderRadius: "50%",
});

const NewCommentInput = styled.input({
  width: "66%",
});
const NewCommentBtn = styled.button({
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

const PostContainer = styled.div({
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.4)",
  padding: {
    xy: "20px",
  },
  boxSizing: "border-box",
  borderRadius: "5px",
});
const Content = styled.div({
  width: "600px",

  padding: {
    xy: "20px",
  },
  // display: "flex",
  // flexDirection: "column",
});

const Header = styled.div({
  width: "100%",
  height: "50px",
  display: "flex",
});

// const IconImg = styled.img({});
// const IconText = styled.img({});

const TitleContainer = styled.div({
  width: "75%",
  height: "32px",
  margin: {
    x: "25px",
  },
  fontSize: "20px",
  border: {
    bottom: {
      width: "1px",
      color: "#50646D",
      style: "solid",
    },
  },
});

const Main = styled.div({});

const MainText = styled.p({
  padding: {
    left: "12%",
    bottom: "20px",
    right: "10%",
  },
  margin: {
    x: "25px",
  },
});

const Footer = styled.div({
  width: "100%",
  display: "flex",
});

const FooterProfilePic = styled.img({
  width: "10%",
  borderRadius: "50%",
});

const FooterText = styled.div({
  margin: { x: "10px" },
  width: "85%",
  height: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

const FooterAuthor = styled.div({
  cursor: "pointer",
  //color: "blue",
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  fontSize: "14px",
});

const FooterDate = styled.div({
  width: "100%",
  display: "flex",
  fontSize: "12px",
});

// const Post = styled.div({
//   width: "100%",
//   display: "flex",
//   flexDirection: "column",

// });

const BackBtn = styled.button({
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
