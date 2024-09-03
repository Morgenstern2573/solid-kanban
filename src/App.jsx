import styles from "./App.module.css";
import Card from "../components/Card/Card";
import { createSignal } from "solid-js";

const [cards, setCards] = createSignal([]);
const [cardBeingDragged, setCardBeingDragged] = createSignal(null);

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
            let l = Array.from(cards());
            const id = l.length + 1;
            l.push({ text: `dummy text ${id}`, lane: 1, id });
            setCards(l);
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
            let l = Array.from(cards());
            const id = l.length + 1;
            l.push({ text: `dummy text ${id}`, lane: 2, id });
            setCards(l);
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
            let l = Array.from(cards());
            const id = l.length + 1;
            l.push({ text: `dummy text ${id}`, lane: 3, id });
            setCards(l);
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
