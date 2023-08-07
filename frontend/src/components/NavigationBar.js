import { useNavigate } from "react-router-dom";
import Logo from "../images/cheese-logo.png";
import "../styles/MainPage.css";
import ButtonMain from "./ButtonMain";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavigationBar() {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  function navigateLogin() {
    navigate("/login");
  }

  function logoutUser() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="NavigationBar">
      <a className="LogoLink" href="http://localhost:9999/">
        <img className="CheeseLogo" src={Logo} alt="cheese-logo" />
      </a>
      {isLoggedIn ? (
        <div className="welcome-section">
          <h2 className="welcome-text">Welcome, {localStorage.getItem("nickname")}!</h2>
          <ButtonMain text="LOGOUT" buttonFunction={logoutUser} />
        </div>
      ) : (
        <ButtonMain text="LOGIN" buttonFunction={navigateLogin} />
      )}
    </nav>
  );
}
