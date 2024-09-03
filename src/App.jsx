import styles from "./App.module.css";
import Card from "../components/Card/Card";
import { createSignal } from "solid-js";

const [cards, setCards] = createSignal([]);
const [cardBeingDragged, setCardBeingDragged] = createSignal(null);
let cardCount = 0;

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev, lane) {
  ev.preventDefault();
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
    >
      <div
        class={styles.lane}
        ondrop={(event) => {
          drop(event, 1);
        }}
        ondragover={(event) => {
          allowDrop(event);
        }}
      >
        <p>Lane 1</p>
        <button
          type="button"
          on:click={() => {
            newCard(1);
          }}
        >
          Add card
        </button>
        <For each={laneOne()}>
          {(val, _) => {
            return <Card val={val} id={val.id}></Card>;
          }}
        </For>
      </div>
      <div
        class={styles.lane}
        ondrop={(event) => {
          drop(event, 2);
        }}
        ondragover={(event) => {
          allowDrop(event);
        }}
      >
        <p>Lane 2</p>
        <button
          type="button"
          on:click={() => {
            newCard(2);
          }}
        >
          Add card
        </button>
        <For each={laneTwo()}>
          {(val, _) => {
            return <Card val={val} id={val.id}></Card>;
          }}
        </For>
      </div>
      <div
        class={styles.lane}
        ondrop={(event) => {
          drop(event, 3);
        }}
        ondragover={(event) => {
          allowDrop(event);
        }}
      >
        <p>Lane 3</p>
        <button
          type="button"
          on:click={() => {
            newCard(3);
          }}
        >
          Add card
        </button>

        <For each={laneThree()}>
          {(val, _) => {
            return <Card val={val} id={val.id}></Card>;
          }}
        </For>
      </div>
    </div>
  );
}

export default App;
