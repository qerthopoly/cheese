import { useNavigate } from "react-router-dom";
import Logo from "../images/cheese-logo.png";
import "../styles/MainPage.css";
import ButtonMain from "./ButtonMain";

export default function NavigationBar() {

  const navigate = useNavigate()

  function navigateLogin() {
    // console.log('LOGIN')
    navigate('/login')
  }

  return (
    <nav className="NavigationBar">
      <a className="LogoLink" href="http://localhost:9999/">
        <img className="CheeseLogo" src={Logo} alt="cheese-logo" />
      </a>
	<ButtonMain text="LOGIN" buttonFunction={navigateLogin} />
    </nav>
  );
}
