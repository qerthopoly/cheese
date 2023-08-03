import { useEffect, useReducer, useState } from "react";

const initialState = {
  data: [],
  isLoading: true,
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
        data: action.payload,
        isLoading: false,
        error: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case "FETCH_SUCCESS_SORT":
      return {
        data: action.payload
          .filter((item) => item.name !== null)
          .map((item) => {
            const name = item.name.toLowerCase();
            const editedName = name.charAt(0).toUpperCase() + name.slice(1);
            return { ...item, name: editedName };
          })
          .sort((a, b) => {
            const itemA = a.name;
            const itemB = b.name;
            if (itemA < itemB) {
              return -1;
            } else if (itemA > itemB) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((item, index) => {
            return { ...item, name: index + 1 + ". " + item.name };
          }),
        isLoading: false,
      };
    default:
      return state;
  }
}

export default function useFetchGet(URL, sort) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [counter, setCounter] = useState(0)

	const handleUpdate = () => setCounter(counter + 1)

  const jwtToken = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    function fetchData() {
      dispatch({ type: "FETCH_START" });

      fetch(URL, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (sort) {
            return dispatch({ type: "FETCH_SUCCESS_SORT", payload: data });
          } else {
            return dispatch({ type: "FETCH_SUCCESS", payload: data });
          }
        })
        .catch((error) => {
          console.log("Error", error);
          dispatch({ type: "FETCH_ERROR" });
        });
    }

    fetchData();
  }, [URL, sort, jwtToken, counter]);

  return {state, update: handleUpdate};
}
