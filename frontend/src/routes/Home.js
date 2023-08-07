import "../styles/MainPage.css";
import NavigationBar from "../components/NavigationBar";
import ButtonMain from "../components/ButtonMain";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function viewCheeses() {
    navigate("/home");
  }

  return (
    <div className="WrapperHome">
      <NavigationBar />
      <div className="MiddleSection">
        <h1 className="HomePageH1">WELCOME TO THE PAGE OF CHEESES!</h1>
        <ButtonMain
          text="CHECK OUT ALL THE CHEESES ➜"
          buttonFunction={viewCheeses}
        />
      </div>
    </div>
  );
}
