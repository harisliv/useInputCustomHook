import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { value: state.value, isTouched: true };
    case "RESET":
      return { value: "", isTouched: false };
  }
};

function useInput(validateValue) {

    const [state, dispatch] = useReducer(reducer, initialState);

  const valueIsValid = validateValue(state.value);
  const hasError = !valueIsValid && state.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({type: "INPUT", value: event.target.value})
  };

  const inputBlurHandler = () => {
    dispatch({type: "BLUR"});
  };

  const reset = () => {
      dispatch({type: "RESET"})
  };
  return {
    value: state.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInput;
