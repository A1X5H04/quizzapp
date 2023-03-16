export default function Answer(props) {
  const answerStyle = {
    backgroundColor: props.isSelected && "black",
    color: props.isSelected && "white",
    fontWeight: props.isSelected && 600,
    borderWidth: props.isSelected && "2px",
  };

  return (
    <button
      style={answerStyle}
      onClick={() => {
        props.handleClick(props.id);
      }}
      className="answer-btn"
    >
      {props.value}
    </button>
  );
}
