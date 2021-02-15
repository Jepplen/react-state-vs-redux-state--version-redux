import { styled } from "@glitz/react";
import * as types from "../actions/types";
import { getIcon, formatText, humanizeTime } from "../utils/utils";
import { useDispatch } from "react-redux";
import * as actions from "../actions";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/CheckRounded";

type Props = {
  data: types.Todo;
  openPost: (value: boolean, postId: number) => void;
  postId: number;
};

const TodoItemCard: React.FC<Props> = ({ data, openPost, postId }) => {
  const dispatch = useDispatch();
  const deleteTodo = (deleteTodo: types.DeleteTodo) => {
    dispatch(deleteTodo);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const deleteIt: types.DeleteTodo = {
      type: actions.DELETE_TODO,
      payload: {
        id: data.id,
      },
    };
    deleteTodo(deleteIt);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    openPost(true, data.id);
  };

  return (
    <Container onClick={handleClick}>
      <Icon>{getIcon(data.category, 24)}</Icon>
      <TextContainer>
        <TextTitle>{formatText(data.title, "title")}</TextTitle>
        <TextContent>{formatText(data.description, "description")}</TextContent>
      </TextContainer>
      <TextCreatorContainer>
        <Author>{formatText(data.authorUserName, "author")}</Author>
        <TextTime>{humanizeTime(data.timeStamp)}</TextTime>
      </TextCreatorContainer>
      {data.completed && (
        <DeleteBtn onClick={handleDelete}>
          <DeleteIcon />
        </DeleteBtn>
      )}
      {data.completed && (
        <CheckContainer>
          <CheckIcon style={{ fontSize: "20px" }} />
        </CheckContainer>
      )}
    </Container>
  );
};

export default TodoItemCard;

const CheckContainer = styled.div({
  color: "white",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "0px",
  height: "100%",
  width: "43px",
  borderRadius: "5px 0px 0px 5px",
  backgroundColor: "rgba(0, 150,0,0.5)",
  display: "flex",
  justifyContent: "center",
  boxSizing: "border-box",
  padding: {
    top: "32px",
  },
  border: {
    right: {
      width: "1px",
      color: "#353446",
      style: "solid",
    },
  },
});

const DeleteBtn = styled.button({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "-50px",
  height: "40px",
  width: "40px",
  borderRadius: "50%",

  backgroundColor: "#2B98B1",
  color: "white",
  border: {
    xy: {
      color: "none",
      width: "none",
      style: "none",
    },
  },
  outline: { style: "none" },
  ":hover": {
    backgroundColor: "#88CAD9",
    color: "red",
  },
  ":active": {
    backgroundColor: "#3E7E8F",
    color: "darkred",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const TextContainer = styled.div({
  width: "65%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: {
    x: "15px",
  },
});

const Container = styled.div({
  position: "relative",
  width: "500px",
  //height: "200px",
  display: "flex",
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: "5px",
  fontSize: "16px",

  padding: {
    xy: "10px",
  },
  margin: {
    bottom: "10px",
  },
  boxSizing: "border-box",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    // border: {
    //   xy: {
    //     color: "white",
    //     style: "solid",
    //     width: "1px",
    //   },
    // },
    //boxShadow: "10px 10px 9px -8px rgba(0,0,0,0.56)",
  },
  //transitionDuration: "0.2s",
  cursor: "pointer",
});

const TextTitle = styled.p({
  padding: {
    xy: "0",
  },
  margin: {
    xy: "0",
  },
});

const TextContent = styled.p({
  fontSize: "12px",
  padding: {
    xy: "0",
  },
  margin: {
    xy: "0",
  },
});

const TextCreatorContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  //width: "30%",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

const TextTime = styled.p({
  fontSize: "12px",
  fontStyle: "italic",
  padding: {
    xy: "0",
  },
  margin: {
    xy: "0",
  },
});

const Author = styled.p({
  fontSize: "14px",
  //fontStyle: "italic",
  padding: {
    xy: "0",
  },
  margin: {
    xy: "0",
  },
});

const Icon = styled.div({
  color: "white",
});
