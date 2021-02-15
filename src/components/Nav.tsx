import { styled } from "@glitz/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const categories = ["All", "Equipment", "Event", "Kitchen", "Social", "Random"];

const Nav: React.FC = () => {
  const [category, setCategory] = useState(categories[0]);
  const dispatch = useDispatch();

  const setCategoryDispatch = (cat: string) => {
    dispatch({ type: "SET_CATEGORY", payload: cat });
  };

  const handleClick = (cat: string) => {
    setCategoryDispatch(cat);
    setCategory(cat);
  };

  return (
    <Navigation
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(88,88,94,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <ButtonContainer>
        {categories.map((categoryName, index) => (
          <CategoryBackground
            onClick={() => handleClick(categoryName)}
            key={categoryName + index}
            style={{
              backgroundColor:
                category === categoryName ? "rgba(255,255,255,0.5)" : "",
            }}
          >
            <CategoryText
              style={{
                border: "none",
                outline: "none",
                color: category === categoryName ? "#323144" : "white",
              }}
            >
              {categoryName}
            </CategoryText>
          </CategoryBackground>
        ))}
      </ButtonContainer>
    </Navigation>
  );
};

export default Nav;

const CategoryBackground = styled.div({
  cursor: "pointer",
  width: "140px",
  padding: {
    xy: "5px",
  },
  boxSizing: "border-box",
  borderRadius: "5px 5px 0px 0px",
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  //transitionDuration: "0.1s",
});

const Navigation = styled.div({
  position: "relative",
  zIndex: 1,
  width: "100vw",
  height: "5vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonContainer = styled.div({
  width: "50%",
  display: "flex",
  justifyContent: "center",
  height: "36px",
});

const CategoryText = styled.p({
  width: "100%",
  textDecoration: "none",

  margin: {
    xy: "0px",
  },
  padding: {
    xy: "0px",
    top: "0px",
  },
  backgroundColor: "none",
  color: "white",
  textAlign: "center",
});
