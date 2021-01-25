import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { styled } from "@glitz/react";

const MainApp = () => {
  return (
    <AppContent>
      <Header />
      <Main />
      <Footer />
    </AppContent>
  );
};

const AppContent = styled.div({});

export default MainApp;
