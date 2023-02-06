// styles
import "./SingeCard.css";

function SingeCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={handleClick}
          className="back"
          src="./assets/img/cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
}

export default SingeCard;
