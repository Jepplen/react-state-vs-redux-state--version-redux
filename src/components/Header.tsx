//import {Link} from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import { styled } from "@glitz/react";
import { connect } from "react-redux";
import { UserState } from "../reducers/loginReducer";
import { RootState } from "../reducers";
import Login from "./Login";
import * as types from "../actions/types";
import ProfileModal from "./ProfileModal";

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
      <HeaderTop>
        <HeaderLeft>Header</HeaderLeft>
        <UserContainer>
          <ProfilePicture src={profilePicture} />
          {isAuthed && (
            <Username>
              Hi{" "}
              <ProfileBtn onClick={handleProfileClick}>{userName}</ProfileBtn>
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

const mapStateToProps = (state: RootState): UserState => {
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

const ProfileBtn = styled.p({});

const ProfilePicture = styled.img({
  width: "50px",
  borderRadius: "50%",
  margin: {
    right: "15px",
  },
});

const Username = styled.p({
  color: "white",
  margin: {
    right: "20px",
  },
});

const HeaderContent = styled.div({
  height: "20vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "yellow",
  // padding: {
  //   top: "40px",
  // },
  // borderRadius: "20px 50px",
});

const HeaderTop = styled.div({
  height: "15vh",
  width: "100vw",
  display: "flex",
  backgroundColor: "red",
  // padding: {
  //   top: "40px",
  // },
  // borderRadius: "20px 50px",
});

const HeaderLeft = styled.div({
  height: "15vh",
  width: "70vw",
  backgroundColor: "dodgerblue",

  // padding: {
  //   top: "40px",
  // },
  // borderRadius: "20px 50px",
});

const UserContainer = styled.div({
  height: "15vh",
  width: "30vw",
  backgroundColor: "green",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // padding: {
  //   top: "40px",
  // },
  // borderRadius: "20px 50px",
});

// export default connect((state: UserState) => ({
//   userName: state.userName,
//   isAuthed: state.isAuthed,
// }))(Header);

// const connector = connect(mapStateToProps);
// type HeaderProps = ConnectedProps<typeof connector>;
// export default connector(Header);

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: (num) => dispatch(actions.increment(num)),
//     decrement: (num) => dispatch(actions.decrement(num)),
//     addBug: () => dispatch(actions.addBug()),
//     removeBug: (id) => dispatch(actions.removeBug(id)),
//     resolveBug: (id) => dispatch(actions.resolveBug(id)),
//   };
// };
//mapDispatchToProps

//   <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           {/* <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/users">Users</Link>
//           </li> */}
//           </ul>
//         </nav>
