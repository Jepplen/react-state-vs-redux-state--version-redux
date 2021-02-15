import { styled } from "@glitz/react";

const Footer = () => {
  return <Content>© Office Planner 2020</Content>;
};

export default Footer;

const Content = styled.div({
  fontSize: "12px",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "10vh",
  backgroundColor: "rgb(30,30,30)",
});
