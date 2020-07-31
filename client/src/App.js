import { Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Router from "./Routers/Router";
function App() {
  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Navigation></Navigation>
        <Box mt={3} mx={10}>
          <Router></Router>
        </Box>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
