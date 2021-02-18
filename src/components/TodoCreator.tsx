import { styled } from "@glitz/react";
import { ChangeEvent, useState } from "react";
import * as types from "../actions/types";
import * as actions from "../actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
export const categories = ["Equipment", "Event", "Kitchen", "Social", "Random"];

type Props = {
  ADD_TODO: (todo: types.Todo) => types.AddTodo;
  userName: string;
};

const TodoCreator: React.FC<Props> = ({ ADD_TODO, userName }) => {
  const showCreator = useSelector<RootState, boolean>(
    (state) => state.showCreator.showCreator
  );

  const todos = useSelector<RootState, types.Todos["todos"]>(
    (state) => state.todos.todos
  );

  //const [showCreator, setShowCreator] = useState(false);
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [check, setCheck] = useState("Random");
  const dispatch = useDispatch();
  const addNote = (note: string) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const toggleCreator = (setCreator: types.ToggleCreator) => {
    dispatch(setCreator);
  };

  const handleCreator = () => {
    // e.stopPropagation();
    const toggleIt: types.ToggleCreator = {
      type: actions.TOGGLE_CREATOR,
    };
    toggleCreator(toggleIt);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo: types.Todo = {
      id: todos.length - 1 + 1,
      title: state.title,
      description: state.description,
      category: check,
      authorUserName: userName,
      timeStamp: Date.now(),
      completed: false,
      comments: [],
    };
    ADD_TODO(todo);
    setState({
      ...state,
      title: "",
      description: "",
    });

    addNote(state.title);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.name);
  };

  return (
    <Content>
      <Header>
        <TopRadius>
          <HeaderText>Posts</HeaderText>
        </TopRadius>
      </Header>
      <AddTask onClick={handleCreator}>
        {showCreator ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </AddTask>
      {showCreator && (
        <CreatorBlock>
          <Categories>
            {categories.map((category, index) => (
              <CategoryLabel key={category + index}>
                <CheckBox
                  type="checkbox"
                  onChange={handleCheck}
                  name={category}
                  checked={check === category ? true : false}
                />
                {category}
              </CategoryLabel>
            ))}
          </Categories>

          <InputContainer>
            <Form onSubmit={handleSubmit}>
              <Label>
                Title
                <TodoTitleInput
                  value={state.title}
                  onChange={handleChange}
                  name={"title"}
                  required
                />
              </Label>
              <Label>
                Description
                <TodoDescriptionInput
                  value={state.description}
                  onChange={handleChange}
                  name={"description"}
                  required
                />
              </Label>
              <SubmitBtn>New post</SubmitBtn>
            </Form>
          </InputContainer>
        </CreatorBlock>
      )}
    </Content>
  );
};

const mapDispatchToProps = {
  ADD_TODO: (todo: types.Todo) => ({
    type: actions.ADD_TODO,
    payload: { todo },
  }),
};

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

export default connect(mapStateToProps, mapDispatchToProps)(TodoCreator);

const CheckBox = styled.input({});

// const AddIcon = styled.div({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -56%)",
//   margin: { xy: "0px" },
//   padding: { xy: "0px" },
// });

const AddTask = styled.div({
  position: "absolute",
  top: "0px",
  right: "8%",
  zIndex: 2,
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //backgroundColor: "#92D1DF",
  backgroundColor: "rgba(146, 209, 223, 0.9)",
  cursor: "pointer",
  color: "#323144",
});

const Categories = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CategoryLabel = styled.label({
  fontSize: "14px",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: {
    x: "10px",
    y: "2px",
  },
});

const Form = styled.form({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
  //height: "50px",
  padding: {
    top: "5px",
    bottom: "15px",
  },
});

const Label = styled.label({
  display: "flex",
  flexDirection: "column",
  color: "white",
  fontSize: "14px",
});

const TodoTitleInput = styled.input({});

const TodoDescriptionInput = styled.input({
  width: "325px",
});

const SubmitBtn = styled.button({
  width: "100px",
  height: "40px",
  backgroundColor: "#2B98B1",
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

const InputContainer = styled.div({
  width: "100%",
  //height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: {
    x: "60px",
  },
  boxSizing: "border-box",
});

const Content = styled.div({
  width: "750px",
  position: "relative",
  //height: "25vh",
  //backgroundColor: "grey",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "5px",
  margin: {
    bottom: "10px",
  },
});

const CreatorBlock = styled.div({
  width: "750px",
  //height: "25vh",
  backgroundColor: "#51515A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "0px 0px 5px 5px",
  // animationName: {
  //   from: {
  //     transform: "translate(0,-100px)",
  //   },
  //   to: {
  //     transform: "translate(0, 0)",
  //   },
  // },
  // animationDuration: "1s",
});

const Header = styled.div({
  position: "relative",
  zIndex: 1,
  width: "100%",
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //backgroundColor: "#269EB8",
  color: "white",
  overflow: "hidden",
});

const TopRadius = styled.div({
  position: "absolute",
  top: "0",
  //left: "0",
  width: "1284px",
  height: "244px",
  borderRadius: "50%",
  //backgroundColor: "#269EB8",
  backgroundColor: "rgba(38, 158, 184, 0.8)",
});

const HeaderText = styled.p({
  position: "absolute",
  top: "0",
  left: "50%",
  transform: "translate(-50%, -15px)",
  //backgroundColor: "#269EB8",
  color: "white",
});
