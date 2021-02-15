import { styled } from "@glitz/react";
import { useSelector } from "react-redux";
import * as types from "../actions/types";
import { RootState } from "../reducers";
import TodoItemCard from "./TodoItemCard";

type Props = {
  openPost: (value: boolean, postId: number) => void;
  postId: number;
};

const TodoList: React.FC<Props> = ({ openPost, postId }) => {
  const todos = useSelector<RootState, types.Todos["todos"]>(
    (state) => state.todos.todos
  );
  const category = useSelector<RootState, types.Category>(
    (state) => state.category
  );

  return (
    <Container>
      {todos.filter((check) => {
        if (category.category === "All") {
          return check;
        }

        if (check.category === category.category) {
          return check;
        }

        return false;
      }).length > 0 ? (
        todos
          .filter((check) => {
            if (category.category === "All") {
              return check;
            }

            if (check.category === category.category) {
              return check;
            }

            return false;
          })
          .map((todo) => (
            <TodoItemCard
              key={todo.timeStamp}
              openPost={openPost}
              data={todo}
              postId={postId}
            />
          ))
          .reverse()
      ) : (
        <p style={{ color: "white" }}>
          No posts found, be the first to add one
        </p>
      )}
    </Container>
  );
};

// const mapStateToProps = (state: RootState): types.Todos => {
//   return {
//     todos: state.todos,
//   };
// };
// export default connect(mapStateToProps)(TodoList);

export default TodoList;

const Container = styled.div({
  margin: {
    bottom: "2px",
  },
});
