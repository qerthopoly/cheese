import "../styles/Card.css";

export default function Card({ image, altText, cheeseName }) {
  return (
    <div className="Card">
      <img className="CardImage" src={image} alt={altText} />
      <div className="CardText">
        <h3 className="CardTitle">{cheeseName} ⇢</h3>
        <div className="LikesSection">
          <p className="HeartSymbol">♡</p>
          <p className="NumberOfLikes">6</p>
        </div>
      </div>
    </div>
  );
}
