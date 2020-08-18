import React from "react";
import { Typography, Box } from "@material-ui/core";

function NoMatch() {
  return (
    <Box height="90vh" margin={20}>
      <Typography align="center" variant="h3" color="textSecondary">
        Page not found!
      </Typography>
      <Typography align="center" variant="h1" color="error">
        404
      </Typography>
    </Box>
  );
}

export default NoMatch;
