import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "./Question";
import WooHoo from "./WooHoo";
import { GithubLogo } from "@phosphor-icons/react";

function getQuestion(array) {
  const newArray = [];
  array.map((item, i) => {
    newArray.push({
      id: nanoid(),
      question: decode(item.question),
      answer: getAnswers(array, i),
    });
  });
  return newArray;
}

function getAnswers(array, i) {
  const newArray = array[i].incorrect_answers;
  newArray.push(array[i].correct_answer);
  newArray.sort(() => Math.random() - 0.5);
  return newArray.map((item) => {
    return {
      value: decode(item),
      id: nanoid(),
      isSelected: false,
      isCorrectAnswer: item == array[i].correct_answer ? true : false,
    };
  });
}

export default function Game(props) {
  const [question, setQuestion] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [solved, setSolved] = React.useState(false);
  const [round, setRound] = React.useState(1);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php" + props.endPoint)
      .then((res) => res.json())
      .then((data) => setQuestion(getQuestion(data.results)));
  }, [round]);

  function selectAnswer(qId, aId) {
    setQuestion((prevAnswer) => {
      return prevAnswer.map((ques) => {
        return ques.id === qId
          ? {
              ...ques,
              answer: ques.answer.map((ans) => {
                return ans.id === aId
                  ? { ...ans, isSelected: true }
                  : { ...ans, isSelected: false };
              }),
            }
          : ques;
      });
    });
    question.forEach((item) => {
      const selectedAnsArr = item.answer.filter((ans) => {
        return ans.isSelected == true;
      });
    });
  }

  function playAgain() {
    setRound((prevRound) => prevRound + 1);
    setScore(0);
    setSolved(false);
  }

  function checkAnswer() {
    question.forEach((ques) => {
      const correctAnsArr = ques.answer.filter((ans) => {
        return ans.isCorrectAnswer === true && ans.isSelected === true;
      });
      setScore((prev) => (prev += correctAnsArr.length));
    });
    setSolved(true);
  }

  const questionElm = question.map((item) => {
    return (
      <Question
        id={item.id}
        key={item.id}
        question={item.question}
        answer={item.answer}
        handleClick={selectAnswer}
        solved={solved}
      />
    );
  });

  return (
    <div className="game-scr">
      {score == question.length && <WooHoo />}
      <header className="game-header">
        <div className="logo" onClick={props.handleClick}>
          <img src="./src/assets/brain-outlined.png" alt="Outlined Logo" />
          <h3>QuizZapp</h3>
        </div>
        <div>
          <a href="https://github.com/a1x5h04">
            <GithubLogo size={32} weight="bold" color="black" />
          </a>
        </div>
      </header>
      <div className="questions-status">
        <p>
          Category: <span>{props.category.category.toUpperCase()}</span>
        </p>
        <p>
          Type: <span>{props.category.type.toUpperCase()}</span>
        </p>
        <p>
          Difficulty: <span>{props.category.difficulty.toUpperCase()}</span>
        </p>
      </div>
      <div className="questions-container">
        <div className="question-container-wrapper">{questionElm}</div>
      </div>
      <div className="result">
        <p>
          You got <b>{score}</b> correct answers out of <b>{question.length}</b>{" "}
          questions
        </p>
        <button onClick={solved ? playAgain : checkAnswer}>
          {solved ? "Play Again" : "Check Answer"}
        </button>
      </div>
    </div>
  );
}
