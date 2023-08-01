import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import "../styles/Pages.css";
import useFetchGet from "../hooks/useFetchGet";
import Card from "../components/Card";
import Grid from "../components/Grid";
import ButtonMain from "../components/ButtonMain";

export default function Cheeses() {
  const cheesesURL = "http://localhost:9998/cheese";
  const navigate = useNavigate();

  const state = useFetchGet(cheesesURL);

  function navigateToAddCheese() {
    navigate('/addcheese')
  }

  return (
    <div className="WrapperHomeCheese">
      <NavigationBar buttonText="LOGIN" />
      <div className="MiddleSectionCheese">
        <div className="middle-section-header">
          <h1 className="CheesesPageH1">Behold - the cheeses:</h1>
          <ButtonMain text="ADD CHEESE +" buttonFunction={navigateToAddCheese} />
        </div>
        <div className="CheeseRenders">
          {state.isLoading ? (
            <h2 className="is-loading-text">Loading...</h2>
          ) : (
            <Grid
              content={state.data.map((cheese) => (
                <Card
                  key={cheese._id}
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

// state.data.map((cheese) =>
// <li>{cheese.name}</li>)
