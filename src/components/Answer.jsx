export default function Answer(props) {
  let answerStyle;

  if (props.isCorrectAnswer) {
    answerStyle = {
      color: props.isSelected ? "#64FFDA" : "black",
      borderColor: props.isSelected ? "#64FFDA" : "black",
      backgroundColor: props.isSelected ? "black" : "#64FFDA",
    };
  } else if (props.isSelected && !props.isCorrectAnswer) {
    answerStyle = {
      color: "#FF4081",
      borderColor: "#FF4081",
      backgroundColor: "black",
    };
  } else {
    answerStyle = { color: "black" };
  }

  const selectStyle = {
    backgroundColor: props.isSelected && "black",
    color: props.isSelected && "white",
    fontWeight: props.isSelected && 600,
    borderWidth: props.isSelected && "2px",
  };

  return (
    <button
      style={props.solved ? answerStyle : selectStyle}
      onClick={() => {
        props.handleClick(props.id);
      }}
      className="answer-btn"
    >
      {props.value}
    </button>
  );
}
