import { useState } from "react";
const useForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  const [touched, setTouched] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState({ error: "" });

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };
  const handleInputChange = (event) => {
    event.persist();
    setTouched({ ...touched, [event.target.value]: true });
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    if (errors) {
      setErrors(Object.keys(errors).forEach((v) => (errors[v] = null)));
      setIsValid(true);
      setSubmitError({ ...submitError, error: null });
    }
    setIsValid(true);
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setErrors,
    errors,
    setIsValid,
    isValid,
    isLoading,
    setIsLoading,
    submitError,
    setSubmitError,
  };
};
export default useForm;
