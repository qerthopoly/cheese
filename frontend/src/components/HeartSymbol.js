import { useState } from "react";
import "../styles/HeartSymbol.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function HeartSymbol({ active, toggleCallback }) {
  const [changeHeart, setChangeHeart] = useState(false);

  console.log('HEART ACTIVE', active)



  return (
    <div className="heart-wrapper" onClick={toggleCallback}>
      {active ? (
        <FaHeart className="filled-heart" />
      ) : (
        <FaRegHeart className="empty-heart" />
      )}
    </div>
  );
}
