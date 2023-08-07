import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import useFetchGet from "../hooks/useFetchGet";
import ButtonMain from "../components/ButtonMain";
import "../styles/CheeseAbout.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Likes from "../components/Likes";
import CommentSection from "../components/CommentSection";

export default function CheeseAbout() {
  const { id } = useParams();

  const { isLoggedIn } = useContext(AuthContext);

  const cheeseURL = `http://localhost:9998/cheese/${id}`;
  const getCommentsURL = `http://localhost:9998/comments/${id}`;

  const { state: cheeseState } = useFetchGet(cheeseURL);
  const { state: commentsState } = useFetchGet(getCommentsURL);

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
              <Likes cheese_id={id} />
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
                <div className="button-wrapper">
                  {isLoggedIn ? (
                    <ButtonMain
                      text="EDIT"
                      buttonFunction={() => navigate(`/cheese_update/${id}`)}
                    />
                  ) : (
                    ""
                  )}
                  <ButtonMain
                    text="RETURN"
                    buttonFunction={() => navigate("/home")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {commentsState.isLoading ? (
          <h2 className="is-loading-text">Loading...</h2>
        ) : (
          <CommentSection cheese_id={id} />
        )}
      </div>
    </div>
  );
}
