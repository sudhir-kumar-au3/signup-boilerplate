import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

export default function FormInput({ handleChange, label, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="standard-error-helper-text"
        label={label}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
}
