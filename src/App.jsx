import styles from "./App.module.css";
import Lane from "../components/Lane/Lane";
import { createSignal } from "solid-js";

const [cards, setCards] = createSignal([]);
const [cardBeingDragged, setCardBeingDragged] = createSignal(null);
let cardCount = 0;

function changeCardLane(lane) {
  let c = cards();
  const i = c.findIndex((val) => {
    return val.id === cardBeingDragged();
  });

  const newCard = { id: c[i].id, text: c[i].text, lane: lane };
  c.splice(i, 1);
  c.push(newCard);

  setCards(Array.from(c));
}

function deleteCard(id) {
  let c = cards();
  const i = c.findIndex((val) => {
    return val.id === id;
  });
  c.splice(i, 1);
  setCards(Array.from(c));
}

function newCard(lane) {
  let l = Array.from(cards());
  cardCount += 1;
  const id = cardCount;
  l.push({ text: `I'm card: ${id}`, lane, id });
  setCards(l);
}

function App() {
  const laneOne = () => {
    return cards().filter((val) => val.lane === 1);
  };
  const laneTwo = () => {
    return cards().filter((val) => val.lane === 2);
  };
  const laneThree = () => {
    return cards().filter((val) => val.lane === 3);
  };

  return (
    <div
      class={styles.App}
      on:CustomDragStart={(event) => {
        setCardBeingDragged(event.detail);
      }}
      on:DeleteCard={(event) => {
        deleteCard(event.detail);
      }}
      on:CreateNewCard={(event) => {
        newCard(event.detail["laneID"]);
      }}
      on:CardDropped={(event) => {
        console.log("drop bubbled");
        changeCardLane(event.detail["laneID"]);
      }}
    >
      <Lane name="To-do" id={1} cards={laneOne}></Lane>
      <Lane name="In progress" id={2} cards={laneTwo}></Lane>
      <Lane name="Done" id={3} cards={laneThree}></Lane>
    </div>
  );
}

export default App;
