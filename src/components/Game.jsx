import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "./Question";
import WooHoo from "./WooHoo";
import { Brain, SignOut } from "@phosphor-icons/react";
import { useTimer } from "use-timer";

function getQuestion(array) {
  const newArray = [];
  array.map((item, i) => {
    newArray.push({
      id: nanoid(),
      isAttempted: false,
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
  const [correctAnswer, setCorrectAnswer] = React.useState(0);
  const [solved, setSolved] = React.useState(false);
  const [attempt, setattempt] = React.useState(false);
  const [round, setRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [win, setWin] = React.useState(false);
  const { time, start, reset } = useTimer({ interval: 1100 - round * 100 });

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php" + props.endPoint)
      .then((res) => res.json())
      .then((data) => setQuestion(getQuestion(data.results)));
    start();
  }, [round]);

  function selectAnswer(qId, aId) {
    setQuestion((prevQuestion) => {
      return prevQuestion.map((ques) => {
        return ques.id === qId
          ? {
              ...ques,
              isAttempted: true,
              answer: ques.answer.map((ans) => {
                return ans.id === aId
                  ? { ...ans, isSelected: true }
                  : { ...ans, isSelected: false };
              }),
            }
          : ques;
      });
    });
    // Not the best solution out there, but I am glad I did it !
    const filter = question.filter((ques) => {
      return ques.isAttempted;
    });
    filter.length + 1 == question.length && setattempt(true);
    setMoves((prevMoves) => prevMoves + 1);
  }

  function nextRound() {
    setRound((prevRound) => prevRound + 1);
    setCorrectAnswer(0);
    setSolved(false);
    setWin(false);
    setattempt(false);
    reset();
  }

  // function restartGame() {}

  // function calculateScore() {
  //   const timeScore = 10 + Math.exp(round) - moves - time;
  //   setScore((prev) => prev + timeScore);
  //   console.log(score);
  // }

  function checkAnswer() {
    question.forEach((ques) => {
      const correctAnsArr = ques.answer.filter((ans) => {
        return ans.isCorrectAnswer === true && ans.isSelected === true;
      });
      setCorrectAnswer((prev) => (prev += correctAnsArr.length));
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
      {win && <WooHoo />}
      <header className="game-header">
        <div className="logo">
          <Brain size={32} weight="bold" />
          <h3>QuizZapp</h3>
        </div>
        <div>
          <SignOut
            style={{ cursor: "pointer" }}
            onClick={props.handleClick}
            size={25}
            weight="fill"
          />
        </div>
      </header>
      <div className="status">
        <p>
          Category: <span>{props.category.category.toUpperCase()}</span>
        </p>
        <p>
          Type: <span>{props.category.type.toUpperCase()}</span>
        </p>
        <p>
          Difficulty: <span>{props.category.difficulty.toUpperCase()}</span>
        </p>
        <p>
          Time: <span>{time}s</span>
        </p>
        <p>
          Round: <span>{round}</span>
        </p>
        <p>
          Moves: <span>{moves}</span>
        </p>
      </div>
      <div className="questions-container">
        <div className="question-container-wrapper">{questionElm}</div>
      </div>

      <div className="result">
        {attempt ? (
          <p>
            You got <b>{correctAnswer}</b> correct answers out of{" "}
            <b>{question.length}</b> questions
          </p>
        ) : (
          <p>
            Please Attempt <b>{question.length}</b> question to check answer
          </p>
        )}
        <button disabled={!attempt} onClick={solved ? nextRound : checkAnswer}>
          {solved ? "Next Round" : "Check Answer"}
        </button>
      </div>
    </div>
  );
}
