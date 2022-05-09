import "./login.css";
import { useContext, useRef } from "react";

import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">EasyAllies</h3>
          <span className="loginDesc">
            Connect and Collaborate with your Ally
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              ref={email}
              minLength="6"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              ref={password}
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress  />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password ?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress />
              ) : (
                "Create a New Account"
              )}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
