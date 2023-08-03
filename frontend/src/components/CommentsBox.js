import "../styles/CommentsBox.css";

export default function CommentsBox({ numberOfComments, comments, addComment }) {
  return (
    <div>
      <div className="section-space-between section-bottom-border">
        <h1 className="about-cheese-h1">COMMENTS</h1>
        <p className="number-of-likes">{numberOfComments}</p>
      </div>
      {comments}
      {addComment}
    </div>
  );
}
