import { useNavigate } from "react-router-dom";
import Logo from "../images/cheese-logo.png";
import Sound from "../sounds/escubidubidu.mp3"
import "../styles/MainPage.css";
import ButtonMain from "./ButtonMain";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaMagic } from "react-icons/fa";


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

  function playSound() {
    new Audio(Sound).play()
  }

  return (
    <nav className="NavigationBar">
      <a className="LogoLink" href="http://localhost:9999/">
        <img className="CheeseLogo" src={Logo} alt="cheese-logo" />
      </a>
      <ButtonMain buttonFunction={playSound} text={<FaMagic />} />
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
