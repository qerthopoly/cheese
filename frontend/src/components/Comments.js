import { useContext } from "react";
import "../styles/CommentsBox.css";
import ButtonDelete from "./ButtonDelete";
import { AuthContext } from "../contexts/AuthContext";

export default function Comments({
  name,
  date,
  comment,
  buttonId,
  deleteFunction,
}) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="comments-section">
      <div className="comment-info">
        <h3 className="comment-name-h3">{name}</h3>
        <p className="comment-p">{date}</p>
      </div>
      <div className="section-space-between">
        <p className="comment-content">{comment}</p>
        {isLoggedIn ? (
          <ButtonDelete
            text="X"
            id={buttonId}
            buttonFunction={deleteFunction}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
