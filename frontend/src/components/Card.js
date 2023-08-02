import "../styles/Card.css";

export default function Card({ id, image, altText, cheeseName, handleClick }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={altText} />
      <div className="card-content">
        <button className="title-link" id={id} onClick={handleClick}>
          <h3 className="card-title">{cheeseName} ⇢</h3>
        </button>
        <div className="likes-section">
          <p className="heart-symbol">♡</p>
          <p className="number-of-likes">6</p>
        </div>
      </div>
    </div>
  );
}
