import * as types from "../actions/types";
//import { useState } from "react";
import { styled } from "@glitz/react";
import { Portal } from "react-portal";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

type Props = {
  user: types.User;
  close: () => void;
};

const ProfileModal: React.FC<Props> = ({ user, close }) => {
  const userState = useSelector<RootState, types.UserState>(
    (state) => state.user
  );

  return (
    <Portal>
      {userState.isAuthed || userState.email !== user.email ? (
        <Modal>
          <Top>
            <ProfileImage>
              <ProfilePicture src={user.profilePicture} />
            </ProfileImage>
            <Details>
              <Text>{user.fullName}</Text>
              {/* <Text>"{user.userName}"</Text> */}
              <Text>{user.email}</Text>
            </Details>
          </Top>
          <BiographyText>
            <Text>Biography:</Text>
            <Text>{user.biography}</Text>
          </BiographyText>
          <Bottom>
            <CloseBtn onClick={() => close()}>Close</CloseBtn>
          </Bottom>
        </Modal>
      ) : (
        <Modal>
          <Bottom>
            <CloseBtn onClick={() => close()}>Close</CloseBtn>
          </Bottom>
        </Modal>
      )}
    </Portal>
  );
};

export default ProfileModal;

const BiographyText = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: {
    xy: "10px",
  },
});

const Text = styled.p({
  margin: {
    xy: "0",
  },
  padding: {
    xy: "0",
  },
});

const Top = styled.div({
  height: "115px",
  width: "100%",
  display: "flex",
  margin: {
    bottom: "15px",
  },
});

const Details = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  //alignItems: "center",
  width: "75%",
  padding: {
    top: "10px",
  },
  boxSizing: "border-box",
});

const ProfileImage = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25%",
});

const Modal = styled.div({
  zIndex: 2,
  width: "500px",
  //height: "500px",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "lightgrey",
  boxShadow: "0px 11px 14px -2px rgba(0,0,0,0.38)",
  borderRadius: "5px",
  padding: {
    xy: "20px",
  },
  boxSizing: "border-box",
});

const CloseBtn = styled.button({
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

const Bottom = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: {
    top: "20px",
  },
});

const ProfilePicture = styled.img({
  width: "100px",
  borderRadius: "5px",
});
