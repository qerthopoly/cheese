import "../styles/Likes.css";
import useFetchGet from "../hooks/useFetchGet";

import useFetchPost from "../hooks/useFetchPost";
import HeartSymbol from "./HeartSymbol";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function Likes({ cheese_id }) {
  const { isLoggedIn } = useContext(AuthContext);

  const likesURL = `http://localhost:9998/likes/${cheese_id}`;
  const likes_user_URL = `http://localhost:9998/likes_user/${cheese_id}`;

  const { state: likesState, update } = useFetchGet(
    isLoggedIn ? likes_user_URL : likesURL
  );

  const { fetchPost } = useFetchPost(likesURL, update);

  return (
    <div className="likes-section">
      <p className="number-of-likes">{likesState.data.numberOfLikes}</p>
      <HeartSymbol
        active={likesState.data.likedByUser}
        toggleCallback={() => fetchPost({})}
      />
    </div>
  );
}
