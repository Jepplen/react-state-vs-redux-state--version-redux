import { GlitzClient } from "@glitz/core";
import { GlitzProvider } from "@glitz/react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

import MainApp from "./components/MainApp";

const glitz = new GlitzClient();

function App() {
  return (
    <GlitzProvider glitz={glitz}>
      <MainApp />

      {/* <Router>
          <Switch>
            <Route path="/social">
              <Social />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </Router> */}
    </GlitzProvider>
  );
}

export default App;
