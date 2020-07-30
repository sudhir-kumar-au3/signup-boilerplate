import { AppBar, Avatar, Button, Grid, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    width: 1170,
    margin: "auto",
  },
  buttonFontSize: {
    fontSize: "12px",
    color: "#a1a1a1",
  },

  AppBar: {
    backgroundColor: "rgb(0,0,0)",
  },

  loginButton: {
    background: "#8BC34A",
    color: "#fff",
    borderRadius: "25px",
    "&:hover": {
      background: "#8BC34A",
      boxShadow: "0px 2px 10px #888888",
    },
  },
});

const Navigation = (props) => {
  const { classes } = props;
  return (
    <AppBar position="static" color="default" className={classes.AppBar}>
      <Grid item sm={12} xs={12} className={classes.container}>
        <Toolbar>
          <Grid className={classes.grow}>
            <Button className={[classes.mainLogo]}>
              <Avatar src="http://img.icons8.com/color/48/000000/spring-logo.png" />
            </Button>
          </Grid>
          <Button color="inherit" className={classes.buttonFontSize}>
            About
          </Button>
          &nbsp;
          <Button
            color="inherit"
            className={[classes.buttonFontSize, classes.loginButton]}
          >
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Button>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};

export default withStyles(styles)(Navigation);
