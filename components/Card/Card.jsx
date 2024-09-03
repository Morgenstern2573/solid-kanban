import styles from "./Card.module.css";
function drag(event, id) {
  const evt = new CustomEvent("CustomDragStart", {
    detail: id,
    bubbles: true,
    composed: true,
  });
  event.target.dispatchEvent(evt);
}

function Card(props) {
  return (
    <div
      class={styles.Card}
      draggable="true"
      ondragstart={(event) => {
        drag(event, props.id);
      }}
    >
      {props.val ? props.val.text : "I am a card!"}
    </div>
  );
}

export default Card;
