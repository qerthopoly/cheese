import { createContext, useEffect, useState } from "react";

// const initialState = {
//   isLoggedIn: false,
//   user_id: null,
//   nickname: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "SET_LOGGED_IN":
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case "SET_LOGGED_OUT":
//       return {
//         ...state,
//         isLoggedIn: false,
//         user_id: null,
//         nickname: null,
//       };
//     default:
//       return state;
//   }
// }

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    setIsLoggedIn(!!jwtToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
