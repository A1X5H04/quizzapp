import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "./Question";
import GameOver from "./GameOver";
import { Brain, SignOut } from "@phosphor-icons/react";
import RoundMode from "./gamemodes/Round";
import TimeMode from "./gamemodes/Time";
import CasualMode from "./gamemodes/Casual";

let mode;

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [solved, setSolved] = React.useState(false);
  const [attempt, setattempt] = React.useState(false);
  const [round, setRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://opentdb.com/api.php" + props.endPoint)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(getQuestion(data.results));
        setIsLoading(false);
      });
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
  }

  function checkAnswer() {
    question.forEach((ques) => {
      const correctAnsArr = ques.answer.filter((ans) => {
        return ans.isCorrectAnswer === true && ans.isSelected === true;
      });
      setCorrectAnswer((prev) => (prev += correctAnsArr.length));
    });
    setSolved(true);
  }

  function calculateScore() {
    const wrongAnswer = correctAnswer - question.length;
  }

  const questionElm = question.map((item) => {
    return (
      <Question
        id={item.id}
        key={item.id}
        question={item.question}
        answer={item.answer}
        handleClick={selectAnswer}
        darkMode={props.darkMode}
        solved={solved}
      />
    );
  });

  switch (props.mode) {
    case "":
      mode = (
        <CasualMode
          quesList={questionElm}
          category={props.category}
          moves={moves}
          correctAns={correctAnswer}
          ques={question}
          attempt={attempt}
          handleCheck={checkAnswer}
          isLoading={isLoading}
        />
      );
      break;
    case "time":
      mode = (
        <TimeMode
          quesList={questionElm}
          category={props.category}
          moves={moves}
          correctAns={correctAnswer}
          ques={question}
          round={round}
          time={props.time}
          attempt={attempt}
          handleCheck={checkAnswer}
          isLoading={isLoading}
        />
      );
      break;
    case "round":
      mode = (
        <RoundMode
          quesList={questionElm}
          category={props.category}
          moves={moves}
          correctAns={correctAnswer}
          ques={question}
          round={round}
          attempt={attempt}
          handleCheck={checkAnswer}
          isLoading={isLoading}
        />
      );
      break;
  }

  return (
    <div className="game-scr">
      {gameOver && (
        <GameOver
          handleClick={props.handleClick}
          mode={props.mode}
          moves={moves}
          rounds={round}
          correct={correctAnswer}
          length={question.length}
        />
      )}
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
      {mode}
    </div>
  );
}
