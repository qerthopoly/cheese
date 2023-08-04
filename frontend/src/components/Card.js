import "../styles/Card.css";
import Likes from "./Likes";

export default function Card({ id, image, altText, cheeseName, handleClick }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={altText} />
      <div className="card-content">
        <button className="title-link" id={id} onClick={handleClick}>
          <h3 className="card-title">{cheeseName} ⇢</h3>
        </button>
        <div className="likes-section">
          <Likes cheese_id={id} />
        </div>
      </div>
    </div>
  );
}
