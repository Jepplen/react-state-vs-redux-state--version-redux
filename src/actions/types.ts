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

export type User = {
  userName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  biography: string;
};
