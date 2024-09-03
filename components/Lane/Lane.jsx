import styles from "./Lane.module.css";
import { createSignal, Show } from "solid-js";

import Card from "../Card/Card";

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".Card:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child, index) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child, index };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  );
}

function Lane(props) {
  const [showNewCardForm, setShowNewCardForm] = createSignal(false);
  const [newCardName, setNewCardName] = createSignal("");
  return (
    <div
      class={styles.lane}
      ondrop={(event) => {
        event.preventDefault();

        const evt = new CustomEvent("CardDropped", {
          detail: { laneID: props.id },
          bubbles: true,
        });
        event.target.dispatchEvent(evt);
      }}
      ondragover={(event) => {
        event.preventDefault();
      }}
      // onmouseover={(event) => {
      //   let p = document.getElementById("c-placeholder");
      //   if (p) {
      //     p.remove();
      //   }

      //   let yPos = event.clientY;

      //   const { element, index } = getDragAfterElement(event.target, yPos);

      //   let d = document.createElement("div");
      //   d.innerText = "placeholder!";
      //   d.id = "c-placeholder";
      //   event.target.insertBefore(d, element);
      // }}
    >
      <p>{props.name ? props.name : `Lane ${props.id}`}</p>

      <button
        type="button"
        on:click={(event) => {
          setShowNewCardForm(!showNewCardForm());
        }}
      >
        Add card
      </button>

      <Show when={showNewCardForm()}>
        <form
          action="#"
          on:submit={(event) => {
            event.preventDefault();
            const evt = new CustomEvent("CreateNewCard", {
              detail: { laneID: props.id, cardName: newCardName() },
              bubbles: true,
            });
            event.target.dispatchEvent(evt);
          }}
        >
          <input
            type="text"
            placeholder="card name"
            required
            on:change={(event) => {
              setNewCardName(event.target.value);
            }}
          />

          <button>Add card</button>

          <button
            type="button"
            on:click={() => {
              setShowNewCardForm(false);
            }}
          >
            Cancel
          </button>
        </form>
      </Show>

      <div class={styles.cardCont}>
        <For each={props.cards()}>
          {(val, _) => {
            return <Card val={val} id={val.id}></Card>;
          }}
        </For>
      </div>
    </div>
  );
}

export default Lane;
