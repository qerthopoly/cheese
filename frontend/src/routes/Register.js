import ButtonMain from "../components/ButtonMain";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";

export default function Register() {
  const usersURL = "http://localhost:9998/register";

  function buttonFn() {
    console.log("LOGIN");
  }

  return (
    <div className="wrapper-register">
      <NavigationBar />
      <div className="middle-section-register">
        <h1 className="register-h1">Login</h1>
        <div className="register-form"></div>
        <h2 className="register-h2">Nickname:</h2>
        <Input type="text" placeholder="" Nickname />
        <h2 className="register-h2">Password:</h2>
        <Input type="password" placeholder="Password" />
        <div className="register-buttons">
          <ButtonMain text="REGISTER" buttonFunction={buttonFn} />
		  <ButtonMain text="CANCEL" buttonFunction={buttonFn} />
        </div>
      </div>
    </div>
  );
}