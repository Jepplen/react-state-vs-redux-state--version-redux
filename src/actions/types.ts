export type LoginType = {
  type: string;
  payload: {
    userName: string;
    fullName: string;
    email: string;
    profilePicture: string;
    biography: string;
  };
};

export type LogoutType = {
  type: string;
};

export type Users = {
  users: User[];
};

export type UserState = {
  isAuthed: boolean;
  userName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  biography: string;
};

export type User = {
  userName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  biography: string;
};

export type Comment = {
  comment: string;
  timeStamp: number;
  authorUserName: string;
};

export type AddComment = {
  type: string;
  payload: {
    todoId: number;
    comment: Comment;
  };
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  category: string;
  authorUserName: string;
  timeStamp: number;
  completed: boolean;
  comments: Comment[];
};

export type AddTodo = {
  type: string;
  payload: {
    todo: Todo;
  };
};

export type ToggleCreator = {
  type: string;
};

export type ShowCreator = {
  showCreator: boolean;
};

export type CompleteTodo = {
  type: string;
  payload: {
    id: number;
    completed: boolean;
  };
};

export type DeleteTodo = {
  type: string;
  payload: {
    id: number;
  };
};

export type Todos = {
  todos: Todo[];
};

export type SetCategory = {
  type: string;
  payload: {
    category: Category;
  };
};

export type Category = {
  category: string;
};
