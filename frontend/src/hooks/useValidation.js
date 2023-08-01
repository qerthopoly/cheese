import { useEffect, useReducer } from "react";

const initialState = {
  body: {},
  validationStatus: {},
  errors: {},
  validationInitComplete: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELDS":
      return {
        ...state,
        body: {
          ...state.body,
          ...action.payload,
        },
      };
    case "VALIDATION_SUCCESS":
      return {
        ...state,
        validationStatus: {
          ...state.validationStatus,
          [action.payload]: {
            is_valid: true,
            error: null,
          },
        },
      };
    case "VALIDATION_ERROR":
      return {
        ...state,
        validationStatus: {
          ...state.validationStatus,
          [action.payload.inputName]: {
            is_valid: false,
            error: action.payload.error,
          },
        },
      };
    case "VALIDATION_INIT":
      let validationStatus = state.validationStatus;
      Object.keys(action.payload).forEach((inputName) => {
        validationStatus[inputName] = {
          is_valid: false,
          error: null,
        };
      });
      // console.log("VAL STATUS", validationStatus);
      return {
        ...state,
        validationStatus: validationStatus,
        validationInitComplete: true,
      };

    default:
      return state;
  }
}

export default function useValidation(validationRules) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "VALIDATION_INIT", payload: validationRules });
  }, [validationRules]);

  function validate(inputName) {
    const ruleName = validationRules[inputName];

    const body = state.body;

    if (ruleName === "text") {
      if (body[inputName] && body[inputName].length >= 3) {
        dispatch({ type: "VALIDATION_SUCCESS", payload: inputName });
      } else {
        dispatch({
          type: "VALIDATION_ERROR",
          payload: {
            inputName: inputName,
            error: "Field text should contain at least 3 characters",
          },
        });
      }
    }

    if (ruleName === "date") {
      if (
        body[inputName] &&
        new Date(body[inputName]) > new Date("2000-01-01")
      ) {
        dispatch({ type: "VALIDATION_SUCCESS", payload: inputName });
      } else {
        dispatch({
          type: "VALIDATION_ERROR",
          payload: {
            inputName: inputName,
            error: "Date must be later than 2000-01-01",
          },
        });
      }
    }

    if (ruleName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (body[inputName] && emailRegex.test(body[inputName])) {
        dispatch({ type: "VALIDATION_SUCCESS", payload: inputName });
      } else {
        dispatch({
          type: "VALIDATION_ERROR",
          payload: {
            inputName: inputName,
            error: "Enter correct email address",
          },
        });
      }
    }
  }

  function setBodyField(fieldName, fieldValue) {
    dispatch({ type: "SET_FIELDS", payload: { [fieldName]: fieldValue } });
  }

  function isValid() {
    return Object.values(state.validationStatus).every(
      (status) => status.is_valid
    );
  }

  function getErrorMessage(inputName) {
    if (state.validationInitComplete === true) {
      return state.validationStatus[inputName].error;
    } else {
      return null;
    }
  }

  return { state, validate, setBodyField, isValid, getErrorMessage };
}
