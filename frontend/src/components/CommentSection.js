import { useContext, useState } from "react";
import useFetchGet from "../hooks/useFetchGet";
import CommentAdd from "./CommentAdd";
import Comments from "./Comments";
import CommentsBox from "./CommentsBox";
import TextArea from "./TextArea";
import { AuthContext } from "../contexts/AuthContext";
import useFetchPost from "../hooks/useFetchPost";
import { useFetchDelete } from "../hooks/useFetchDelete";

export default function CommentSection({ cheese_id }) {
  const { isLoggedIn } = useContext(AuthContext);

  const postCommentsURL = `http://localhost:9998/comments`;
  const getCommentsURL = `http://localhost:9998/comments/${cheese_id}`;

  const { state: commentsState, update } = useFetchGet(getCommentsURL);

	const [body, setBody] = useState({});

  const { state, fetchPost } = useFetchPost(postCommentsURL, update);

  const fetchDelete = useFetchDelete(postCommentsURL, update);

  function handleSubmit() {
	fetchPost(body)
	setBody({...body, comment: ''})
  }

  return (
    <div className="comment-box">
      <CommentsBox
        numberOfComments={commentsState.data.length}
        comments={commentsState.data.map((comment, index) => (
          <Comments
            key={index}
            name={comment.nickname}
            date={comment.date.split("T")[0]}
            comment={comment.comment}
            buttonId={comment.user_id}
            deleteFunction={() => fetchDelete(comment._id)}
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
                  cheese_id: cheese_id,
                })
              }
              placeholder="Comment"
			  value={body.comment}
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
        <h2 className="is-loading-text">Please fill the form correctly</h2>
      ) : (
        <></>
      )}
    </div>
  );
}
