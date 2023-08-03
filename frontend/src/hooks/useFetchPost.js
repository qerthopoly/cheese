import { useReducer } from "react";

const initialState = {
  isLoading: false,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        error: false,
      };
    case "FETCH_ERROR": {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    default:
      return state;
  }
}

export default function useFetchPost(URL, successCallBack) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const jwtToken = sessionStorage.getItem("jwtToken");

  function fetchPost(body) {
    dispatch({ type: "FETCH_START" });
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: "FETCH_ERROR" });
          return console.log("Fetch post error", data.message);
        } else {
          dispatch({ type: "FETCH_SUCCESS" });
          successCallBack(data);
        }
      });
  }

  return { state, fetchPost };
}
