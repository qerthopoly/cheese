import Logo from "../images/cheese-logo.png";
import "../styles/MainPage.css";
import ButtonMain from "./ButtonMain";

export default function NavigationBar({ buttonText, buttonFunction }) {
  return (
    <nav className="NavigationBar">
      <a className="LogoLink" href="http://localhost:9999/">
        <img className="CheeseLogo" src={Logo} alt="cheese-logo" />
      </a>
	<ButtonMain text={buttonText} buttonFunction={buttonFunction} />
    </nav>
  );
}
