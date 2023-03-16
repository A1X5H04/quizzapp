import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  const answerElm = props.answer.map((item) => {
    return (
      <Answer
        key={item.id}
        id={item.id}
        isSelected={item.isSelected}
        isCorrectAnswer={item.isCorrectAnswer}
        handleClick={() => props.handleClick(props.id, item.id)}
        value={item.value}
      />
    );
  });

  return (
    <div className="question">
      <div className="question-container">
        <p>{props.question}</p>
      </div>
      <div className="answers-container">{answerElm}</div>
    </div>
  );
}
