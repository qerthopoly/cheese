import { useNavigate } from "react-router-dom";
import ButtonMain from "../components/ButtonMain";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import useFetchPost from "../hooks/useFetchPost";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const usersURL = "http://localhost:9998/login";

  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);

  const { state, fetchPost } = useFetchPost(usersURL, successfullLogin);

  function navigateToRegister() {
    navigate("/register");
  }

  function successfullLogin(data) {
    const JWTtoken = data.token;
    const user_id = data.user_id;
    const nickname = data.nickname;
    sessionStorage.setItem("jwtToken", JWTtoken);
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("nickname", nickname);

    setIsLoggedIn(true);
    navigate("/home");
  }

  function handleLogin() {
    fetchPost(user);
  }

  return (
    <div className="wrapper-login">
      <NavigationBar />
      <div className="middle-section-login">
        <h1 className="login-h1">Login</h1>
        <div className="login-form">
          <h2 className="login-h2">Nickname:</h2>
          <Input
            type="text"
            placeholder="Nickname"
            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
          />
          <h2 className="login-h2">Password:</h2>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="login-buttons">
          <ButtonMain text="LOGIN" buttonFunction={handleLogin} />
          <ButtonMain text="REGISTER" buttonFunction={navigateToRegister} />
        </div>
        {state.isLoading ? (
          <h2 className="is-loading-text">Loading...</h2>
        ) : (
          <></>
        )}
        {state.error ? (
          <h2 className="is-loading-text">Incorrect nickname or password</h2>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
