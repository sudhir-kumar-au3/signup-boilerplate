import React from "react";
import { Typography, Grid } from "@material-ui/core";
import FormInput from "./FormInput";
import useForm from "../Hooks/FormHook";

function Login() {
  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const register = () => {};
  const { inputs, handleSubmit, handleInputChange } = useForm(
    initialValues,
    register
  );
  return (
    <React.Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit" component="div">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              required
              type="text"
              value={inputs.name}
              handleChange={handleInputChange}
            ></FormInput>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Login;
