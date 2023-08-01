import { useNavigate } from "react-router-dom";
import ButtonMain from "../components/ButtonMain";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import useFetchPost from "../hooks/useFetchPost";
import { useState } from "react";

export default function Register() {
  const usersURL = "http://localhost:9998/register";

  const [body, setBody] = useState([]);

  const navigate = useNavigate();

  const { state, fetchPost } = useFetchPost(usersURL, navigateReturnToLogin);

  function handleRegister () {
    fetchPost(body)
  }

  function navigateReturnToLogin() {
    navigate("/login");
  }

  return (
    <div className="wrapper-register">
      <NavigationBar />
      <div className="middle-section-register">
        <h1 className="register-h1">Register</h1>
        <div className="register-form">
          <h2 className="register-h2">Nickname:</h2>
          <Input
            type="text"
            placeholder="Nickname"
            onChange={(e) => setBody({...body, nickname: e.target.value})}
          />
          <h2 className="register-h2">Password:</h2>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setBody({...body, password: e.target.value})}
          />
          <h2 className="register-h2">E-mail:</h2>
          <Input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setBody({...body, email: e.target.value})}
          />
        </div>
        <div className="register-buttons">
          <ButtonMain
            text="REGISTER"
            buttonFunction={handleRegister}
          />
          <ButtonMain text="CANCEL" buttonFunction={navigateReturnToLogin} />
        </div>
        {state.isLoading ? <h2 className="is-loading-text">Loading...</h2> : <></>}
        {state.error ? (
          <h2 className="is-loading-text">
            Please fill the form correctly
          </h2>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
