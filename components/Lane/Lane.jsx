import styles from "./Lane.module.css";

import Card from "../Card/Card";

function Lane(props) {
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
          const evt = new CustomEvent("CreateNewCard", {
            detail: { laneID: props.id },
            bubbles: true,
          });
          event.target.dispatchEvent(evt);
        }}
      >
        Add card
      </button>

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
