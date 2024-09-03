import styles from "./Card.module.css";
function drag(event, id) {
  const evt = new CustomEvent("CustomDragStart", {
    detail: id,
    bubbles: true,
  });
  event.target.dispatchEvent(evt);
}

function Card(props) {
  return (
    <div
      class={styles.Card}
      draggable="true"
      ondragstart={(event) => {
        setTimeout(() => {
          event.target.style.display = "none";
        }, 100);
        drag(event, props.id);
      }}
      ondragend={(event) => {
        event.target.style.display = "block";
      }}
    >
      {props.val ? props.val.text : "I am a card!"}

      <button
        onclick={[
          (id, event) => {
            const evt = new CustomEvent("DeleteCard", {
              detail: id,
              bubbles: true,
            });
            event.target.dispatchEvent(evt);
          },
          props.id,
        ]}
      >
        del
      </button>
    </div>
  );
}

export default Card;
