// react hooks
import { useState, useEffect } from "react";
// components
import SingeCard from "./components/SingeCard";
// icons and styles
import { ImSpinner11 } from "react-icons/im";
import "./App.css";

const cardImages = [
  { src: "./assets/img/react.png", matched: false },
  { src: "./assets/img/sharp.png", matched: false },
  { src: "./assets/img/python.png", matched: false },
  { src: "./assets/img/swift.png", matched: false },
  { src: "./assets/img/js.png", matched: false },
  { src: "./assets/img/java.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setIsDisabled] = useState(false);
  // shuffle cards
  const randomCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstCard(null);
    setSecondCard(null);
    setCards(shuffledCards);
  };

  // handle Choice
  const handleChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (firstCard && secondCard) {
      setIsDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }

    return () => clearTimeout();
  }, [firstCard, secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setIsDisabled(false);
  };

  useEffect(() => {
    randomCards();
  }, []);

  return (
    <div className="App">
      <div className="app_flex">
        <h1>Memory Game 💡</h1>
        <button onClick={randomCards}>
          <ImSpinner11 className="icon" />
        </button>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingeCard
            flipped={card === firstCard || card === secondCard || card.matched}
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
