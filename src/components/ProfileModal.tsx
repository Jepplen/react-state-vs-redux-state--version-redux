import * as types from "../actions/types";
//import { useState } from "react";
import { styled } from "@glitz/react";

type Props = {
  user: types.User;
  close: () => void;
};

const ProfileModal: React.FC<Props> = ({ user, close }) => {
  return (
    <Modal>
      <ProfilePicture src={user.profilePicture} />
      <p>{user.userName}</p>
      <p>{user.email}</p>
      <p>{user.fullName}</p>
      <p>{user.biography}</p>
      <CloseBtn onClick={() => close()}>Close</CloseBtn>
    </Modal>
  );
};

export default ProfileModal;

const Modal = styled.div({
  width: "500px",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "lightgrey",
  boxShadow: "0px 11px 14px -2px rgba(0,0,0,0.38)",
});

const CloseBtn = styled.button({});

const ProfilePicture = styled.img({
  width: "100px",
  borderRadius: "50%",
});
