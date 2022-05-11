import { createContext, useReducer,useEffect } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  return (
    <AuthContext.Provider
    value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
      >
      {children}
    </AuthContext.Provider>
  );
};

/*
const INITIAL_STATE = {
  user: {
    _id: "627691a76b402cbdf2eedadf",
    username: "Jane",
    email: "jane@gmail.com",
    password: "$2b$10$mhRgFjayj5o6Z8ctyMyIMOMd5BHFb6mV.NZRPRt.925MxcNu8srGe",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    followers: ["627691726b402cbdf2eedad9"],
    followings: ["627691726b402cbdf2eedad9"],
    isAdmin: false,
    createdAt: { $date: { $numberLong: "1651937703732" } },
    updatedAt: { $date: { $numberLong: "1651937747309" } },
  },
  isFetching: false,
  error: false,
};
*/