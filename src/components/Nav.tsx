import { styled } from "@glitz/react";
const categories = [
  "All",
  "Meetings",
  "Equipment",
  "Events",
  "Kitchen",
  "Social",
  "Random",
];

const handleClick = (category: string) => {
  console.log(category);
};

const Nav = () => {
  return (
    <Navigation>
      <ButtonContainer>
        {categories.map((categoryName, index) => (
          <CategoryBtn
            key={categoryName + index}
            onClick={() => handleClick(categoryName)}
          >
            {categoryName}
          </CategoryBtn>
        ))}
      </ButtonContainer>
    </Navigation>
  );
};

export default Nav;

const Navigation = styled.div({
  width: "100vw",
  height: "10vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "blueviolet",
});

const ButtonContainer = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const CategoryBtn = styled.button({
  width: "80px",
});
