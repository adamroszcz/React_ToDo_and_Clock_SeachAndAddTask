const ButtonToDoOrDone = props => {
  return (
    <button id={props.id} onClick={props.change}>
      {props.active ? "Done" : "ToDo"}
    </button>
  );
};
