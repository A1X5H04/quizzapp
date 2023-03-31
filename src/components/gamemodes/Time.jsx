import { useState } from "react";
import { useTimer } from "react-timer-hook";
import GameOver from "../GameOver";

export default function TimeMode(props) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + props.time);
  const [gameOver, setGameOver] = useState(false);
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => setGameOver(true),
  });

  return (
    <>
      {gameOver && <GameOver />}
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
          Mode: <span>Time</span>
        </p>
        <p>
          Time Left: <span>{minutes}</span> : <span>{seconds}</span>
        </p>
        <p>
          Moves: <span>{props.moves}</span>
        </p>
      </div>
      <div className="questions-container">
        {props.isLoading ? (
          <img style={{ width: "75px" }} src="/assets/loading.gif" />
        ) : (
          <div className="question-container-wrapper">{props.quesList}</div>
        )}
      </div>

      <div className="result">
        {props.attempt ? (
          <p>
            You got <b>{props.correctAns}</b> correct answers out of{" "}
            <b>{props.ques.length}</b> questions
          </p>
        ) : (
          <p>
            Please Attempt <b>{props.ques.length}</b> question to check answer
          </p>
        )}
        <button disabled={!props.attempt} onClick={props.handleCheck}>
          "Check Answer"
        </button>
      </div>
    </>
  );
}
