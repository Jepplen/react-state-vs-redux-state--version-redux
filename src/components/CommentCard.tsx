import * as types from "../actions/types";
import { styled } from "@glitz/react";
import { formatText, humanizeTime } from "../utils/utils";

type Props = {
  comment: types.Comment;
  profile: types.User;
  loadProfile: (user: types.User) => void;
};

const CommentCard: React.FC<Props> = ({ comment, profile, loadProfile }) => {
  return (
    <CommentContainer>
      <ImageContainer>
        <ProfilePic src={profile.profilePicture} />
      </ImageContainer>
      <TextContainer>
        <ProfileName onClick={() => loadProfile(profile)}>
          {formatText(comment.authorUserName, "title")}
        </ProfileName>
        <Text>{comment.comment}</Text>
        <DateContainer>
          <Date>{humanizeTime(comment.timeStamp)}</Date>
        </DateContainer>
      </TextContainer>
    </CommentContainer>
  );
};

const ImageContainer = styled.div({
  width: "7%",
  margin: {
    right: "20px",
  },
});

const TextContainer = styled.div({
  width: "85%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const CommentContainer = styled.div({
  width: "100%",
  //height: "50px",
  //backgroundColor: "grey",
  display: "flex",
  border: {
    bottom: {
      style: "solid",
      color: "#353446",
      width: "1px",
    },
  },
  margin: {
    y: "10px",
  },
});

const ProfilePic = styled.img({
  width: "100%",
  borderRadius: "50%",
});

const ProfileName = styled.p({
  width: "100%",
  margin: { xy: "0" },
  cursor: "pointer",
  color: "black",
});
const Text = styled.p({
  width: "100%",
  margin: { xy: "0" },
  fontSize: "14px",
});
const DateContainer = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});
const Date = styled.p({
  margin: { xy: "0" },
  fontSize: "12px",
  fontStyle: "italic",
});

export default CommentCard;
