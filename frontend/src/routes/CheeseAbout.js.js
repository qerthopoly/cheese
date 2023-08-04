import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import useFetchGet from "../hooks/useFetchGet";
import ButtonMain from "../components/ButtonMain";
import "../styles/CheeseAbout.css";
import CommentsBox from "../components/CommentsBox";
import Comments from "../components/Comments";
// import { useEffect, useState } from "react";
import CommentAdd from "../components/CommentAdd";
import useFetchPost from "../hooks/useFetchPost";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import TextArea from "../components/TextArea";
import { useFetchDelete } from "../hooks/useFetchDelete";
import HeartSymbol from "../components/HeartSymbol";
import Likes from "../components/Likes";

export default function CheeseAbout() {
  const { id } = useParams();

  const { isLoggedIn } = useContext(AuthContext);

  const cheeseURL = `http://localhost:9998/cheese/${id}`;
  const postCommentsURL = `http://localhost:9998/comments`;
  const getCommentsURL = `http://localhost:9998/comments/${id}`;

  const { state: cheeseState } = useFetchGet(cheeseURL);
  const { state: commentsState, update } = useFetchGet(getCommentsURL);

  const navigate = useNavigate();

  const [body, setBody] = useState([]);

  const { state, fetchPost } = useFetchPost(postCommentsURL, update);

  function handleSubmit() {
    fetchPost(body);
  }

  const fetchDelete = useFetchDelete(postCommentsURL, update);

  function deleteComment(commentID, userID) {
    fetchDelete(commentID);
  }

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
          <div>
            <CommentsBox
              numberOfComments={commentsState.data.length}
              comments={commentsState.data.map((comment, index) => (
                <Comments
                  key={index}
                  name={comment.nickname}
                  date={comment.date.split("T")[0]}
                  comment={comment.comment}
                  buttonId={comment.user_id}
                  deleteFunction={() =>
                    deleteComment(comment._id, comment.user_id)
                  }
                />
              ))}
            />

            {isLoggedIn ? (
              <CommentAdd
                textArea={
                  <TextArea
                    onChange={(e) =>
                      setBody({
                        ...body,
                        comment: e.target.value,
                        cheese_id: id,
                      })
                    }
                    placeholder="Comment"
                  />
                }
                buttonFunction={handleSubmit}
              />
            ) : (
              <p className="paragraph-center">Log in to add comment</p>
            )}
            {state.isLoading ? (
              <h2 className="is-loading-text">Loading...</h2>
            ) : (
              <></>
            )}
            {state.error ? (
              <h2 className="is-loading-text">
                Please fill the form correctly
              </h2>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
