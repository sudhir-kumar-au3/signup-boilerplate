import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

export default function FormInput({ icon, handleChange, label, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>{icon}</Grid>
        <Grid item></Grid>
        <TextField label={label} onChange={handleChange} {...rest} />
      </Grid>
    </div>
  );
}
