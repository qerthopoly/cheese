import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import useFetchGet from "../hooks/useFetchGet";
import ButtonMain from "../components/ButtonMain";
import "../styles/CheeseAbout.css";
import useFetchPost from "../hooks/useFetchPost";
import Comments from "../components/Comments";

export default function CheeseAbout() {
  const { id } = useParams();
  console.log("ID", id);
  const cheeseURL = `http://localhost:9998/cheese/${id}`;
  const commentsURL = "http://localhost:9998/comments";

  const cheeseState = useFetchGet(cheeseURL);
  const commentsState = useFetchGet(commentsURL);

  function comments() {
    const commentsAboutCheese = commentsState.data.filter(
      (comment) => comment.cheese_id === id
    );
    return commentsAboutCheese
  }

  comments();

  // const { state, fetchPost } = useFetchPost(usersURL, navigateReturnToLogin);

  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <NavigationBar />
      <div className="middle-section">
        {cheeseState.isLoading ? (
          <h2 className="is-loading-text">Loading...</h2>
        ) : (
          <div className="wrapper-one-cheese">
            <div className="section-space-between section-bottom-border">
              <h1 className="about-cheese-h1">{cheeseState.data.name}</h1>
              <div className="likes-section">
                <p className="heart-symbol">♡</p>
                <p className="number-of-likes">6</p>
              </div>
            </div>
            <div className="about-cheese-section">
              <img
                className="about-cheese-img"
                alt={cheeseState.data.name}
                src={cheeseState.data.picture}
              />
              <div className="about-cheese-text">
                <p className="about-cheese-description">
                  {cheeseState.data.description}
                </p>
                <ButtonMain
                  text="RETURN TO CHEESES"
                  buttonFunction={() => navigate("/home")}
                />
              </div>
            </div>
          </div>
        )}
        {commentsState.isLoading ? (
          <h2 className="is-loading-text">Loading...</h2>
        ) : (
          <Comments />
        )}
      </div>
    </div>
  );
}
