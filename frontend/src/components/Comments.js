import "../styles/CommentsBox.css";
import ButtonDelete from "./ButtonDelete";
import ButtonMain from "./ButtonMain";

export default function Comments({ name, date, comment, buttonId, deleteFunction }) {
  return (
      <div className="comments-section">
        <div className="comment-info">
          <h3 className="comment-name-h3">{name}</h3>
          <p className="comment-p">{date}</p>
        </div>
		<div className="section-space-between">
        <p className="comment-content">{comment}</p>
		<ButtonDelete text='X' id={buttonId} buttonFunction={deleteFunction}/>
		</div>

      </div>
  );
}