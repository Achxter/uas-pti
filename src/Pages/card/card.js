import "./card.css";
import "./flip-transition.css";

function Card({onClick}) {
  return (
    <div className="cardeu" onClick={onClick}>
      <div className="card-back">Back</div>
      <div className="card-front">Front</div>
    </div>
  );
}

export default Card;
