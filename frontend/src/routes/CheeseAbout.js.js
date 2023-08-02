import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import useFetchGet from "../hooks/useFetchGet";
import ButtonMain from "../components/ButtonMain";
import "../styles/CheeseAbout.css";

export default function CheeseAbout() {
  const { id } = useParams();
  const cheeseURL = `http://localhost:9998/cheese/${id}`;

  const state = useFetchGet(cheeseURL);

  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <NavigationBar />
      <div className="middle-section">
        {state.isLoading ? (
          <h2 className="is-loading-text">Loading...</h2>
        ) : (
          <div className="wrapper-one-cheese">
            <div className="section-space-between section-bottom-border">
              <h1 className="about-cheese-h1">{state.data.name}</h1>
              <div className="likes-section">
                <p className="heart-symbol">♡</p>
                <p className="number-of-likes">6</p>
              </div>
            </div>
            <div className="about-cheese-section">
              <img
                className="about-cheese-img"
                alt={state.data.name}
                src={state.data.picture}
              />
              <div className="about-cheese-text">
                <p className="about-cheese-description">
                  {state.data.description}
                </p>
                <ButtonMain
                  text="RETURN TO CHEESES"
                  buttonFunction={() => navigate("/home")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
