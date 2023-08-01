import { useNavigate } from "react-router-dom";
import ButtonMain from "../components/ButtonMain";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";

export default function Login() {
  const usersURL = "http://localhost:9998/login";

  const navigate = useNavigate()

  function navigateToRegister() {
    navigate('/register')
  }

  function buttonFn() {
    console.log("LOGIN");
  }

  return (
    <div className="wrapper-login">
      <NavigationBar />
      <div className="middle-section-login">
        <h1 className="login-h1">Login</h1>
        <div className="login-form">
          <h2 className="login-h2">Nickname:</h2>
          <Input type="text" placeholder="Nickname" />
          <h2 className="login-h2">Password:</h2>
          <Input type="password" placeholder="Password" />
        </div>
        <div className="login-buttons">
          <ButtonMain text="LOGIN" buttonFunction={buttonFn} />
          <ButtonMain text="REGISTER" buttonFunction={navigateToRegister} />
        </div>
      </div>
    </div>
  );
}
