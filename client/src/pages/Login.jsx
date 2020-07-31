import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import FormInput from "../components/FormInput";
import useForm from "../Hooks/FormHook";
import { login } from "../services/userApis";
import { useHistory } from "react-router-dom";
function Login() {
  const history = useHistory();
  const loginHandle = async () => {
    const userData = {
      email: inputs.email,
      password: inputs.password,
    };
    try {
      if (validateForm()) {
        console.log("inputs; ", userData);
        setIsLoading(true);
        const response = await login(userData);
        if (response) {
          console.log("response login: ", response);
          setIsLoading(false);
          localStorage.setItem("authUser", JSON.stringify(response.data));
          history.push("/home");
        }
      }
    } catch (error) {
      if (error && error.response) {
        setSubmitError({ ...submitError, error: error.response.data.error });
        setIsLoading(false);
      }
    }
  };

  const {
    inputs,
    setErrors,
    errors,
    setIsValid,
    isValid,
    isLoading,
    setIsLoading,
    handleSubmit,
    handleInputChange,
    submitError,
    setSubmitError,
  } = useForm(
    {
      name: null,
      mobile: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    loginHandle
  );
  const validateForm = () => {
    let values = inputs;
    let error = { ...errors };
    let formIsValid = true;
    if (!values.email) {
      formIsValid = false;
      error.email = "Please enter your email";
      setIsValid(false);
    }
    if (!values.password) {
      formIsValid = false;
      error.password = "Please enter your password.";
      setIsValid(false);
    }

    setErrors({ ...error, error });
    setIsLoading(false);
    console.log("validate form: ", values, error, formIsValid);
    return formIsValid;
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item>
          <Typography variant="h4" color="inherit" component="div">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              required
              type="email"
              name="email"
              error={!isValid}
              value={inputs.email}
              handleChange={handleInputChange}
              icon={<AccountCircle></AccountCircle>}
              helperText={errors ? errors.email : ""}
            ></FormInput>
            <FormInput
              label="Password"
              required
              type="password"
              name="password"
              error={!isValid}
              value={inputs.password}
              handleChange={handleInputChange}
              icon={<VpnKeyIcon></VpnKeyIcon>}
              helperText={errors ? errors.password : ""}
            ></FormInput>
            {submitError && (
              <Typography variant="body2" color="error" align="center">
                {submitError.error}
              </Typography>
            )}
            <Box margin={5}>
              <Button
                disabled={!isValid}
                type="submit"
                color="primary"
                variant="outlined"
              >
                {isLoading ? <CircularProgress></CircularProgress> : "Login"}
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Login;
