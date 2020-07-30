import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Box } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Router from "./Routers/Router";
import Navigation from "./components/Navigation";
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
