//import {Link} from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import { styled } from "@glitz/react";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import Login from "./Login";
import * as types from "../actions/types";
import ProfileModal from "./ProfileModal";
import { formatText } from "../utils/utils";

type Props = {
  isAuthed: boolean;
  userName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  biography: string;
};

const Header: React.FC<Props> = ({
  isAuthed,
  userName,
  fullName,
  email,
  profilePicture,
  biography,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const user: types.User = {
    userName,
    fullName,
    email,
    profilePicture,
    biography,
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const closeModal = () => {
    setShowProfile(false);
  };

  return (
    <HeaderContent>
      <HeaderTop
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(88,88,94,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <HeaderLeft>
          <HeaderText>Office Planner</HeaderText>
          <LineDesign></LineDesign>
        </HeaderLeft>
        <UserContainer>
          <ProfilePicture src={profilePicture} />
          {isAuthed && (
            <Username>
              Hi{" "}
              <ProfileBtn onClick={handleProfileClick}>
                {formatText(userName, "username")}
              </ProfileBtn>
            </Username>
          )}
          <Login />
        </UserContainer>
      </HeaderTop>

      <Nav />
      {showProfile && <ProfileModal user={user} close={closeModal} />}
    </HeaderContent>
  );
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

export default connect(mapStateToProps)(Header);

const LineDesign = styled.div({
  backgroundColor: "white",
  width: "550px",
  height: "1px",
  transform: "translateX(25%)",
});

const ProfileBtn = styled.p({
  cursor: "pointer",
  margin: {
    left: "5px",
  },
});

const ProfilePicture = styled.img({
  width: "50px",
  borderRadius: "50%",
  margin: {
    right: "15px",
  },
});

const HeaderText = styled.div({
  fontSize: "40px",
  fontWeight: "bold",
  color: "white",
});

const HeaderLeft = styled.div({
  height: "15vh",
  width: "70vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Username = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100px",
  color: "white",
  margin: {
    right: "20px",
  },
});

const HeaderContent = styled.div({
  position: "relative",
  zIndex: 1,
  height: "20vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
});

const HeaderTop = styled.div({
  height: "15vh",
  width: "100vw",
  display: "flex",
});

const UserContainer = styled.div({
  height: "15vh",
  width: "30vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
