import styles from "./Lane.module.css";
import { createSignal, Show } from "solid-js";

import Card from "../Card/Card";

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
