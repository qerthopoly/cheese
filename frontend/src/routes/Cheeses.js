import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import "../styles/Pages.css";
import useFetchGet from "../hooks/useFetchGet";
import Card from "../components/Card";
import Grid from "../components/Grid";
import ButtonMain from "../components/ButtonMain";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Cheeses() {
  const cheesesURL = "http://localhost:9998/cheese";
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);

  const {state} = useFetchGet(cheesesURL);

  return (
    <div className="wrapper">
      <NavigationBar />
      <div className="middle-section">
        <div className="section-space-between">
          <h1 className="CheesesPageH1">Behold - the cheeses:</h1>
          {isLoggedIn ? (
            <ButtonMain
              text="ADD CHEESE +"
              buttonFunction={() => navigate("/addcheese")}
            />
          ) : (
            <p className="paragraph">Log in to add cheese</p>
          )}
        </div>
        <div className="CheeseRenders">
          {state.isLoading ? (
            <h2 className="is-loading-text">Loading...</h2>
          ) : (
            <Grid
              content={state.data.map((cheese) => (
                <Card
                  key={cheese._id}
                  id={cheese._id}
                  handleClick={() => navigate(`/cheese/${cheese._id}`)}
                  image={cheese.picture}
                  altText={cheese.name}
                  cheeseName={cheese.name}
                />
              ))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
