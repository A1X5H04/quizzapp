import { Timer, ArrowsClockwise, SmileyXEyes } from "@phosphor-icons/react";

export default function gameOverScr(props) {
  let renderHeader;

  switch (props.mode) {
    case "time":
      renderHeader = (
        <header>
          <Timer size={35} weight="fill" />
          <h3>Time's Up</h3>
        </header>
      );
      break;
    case "round":
      renderHeader = (
        <header>
          <ArrowsClockwise size={32} weight="fill" />
          <h3>Round's Over</h3>
        </header>
      );
      break;
    default:
      renderHeader = (
        <header>
          <SmileyXEyes size={32} weight="fill" />
          <h3>Game Over</h3>
        </header>
      );
  }

  return (
    <div className="modal-background">
      <div className="gameover modal">
        {renderHeader}
        <div className="content">
          <h4>
            Your Score <br /> <span>{props.score}</span>
          </h4>
          <div className="stats-grid">
            <div>
              <p>Moves</p>
              <span>{props.moves}</span>
            </div>
            <div>
              <p>Round</p>
              <span>{props.rounds}</span>
            </div>
            <div>
              <p>Correct</p>
              <span>
                {props.correct}/{props.length}
              </span>
            </div>
            <div>
              <p>Wrong</p>
              <span>
                {props.length - props.correct}/{props.length}
              </span>
            </div>
          </div>
        </div>
        <button onClick={props.handleClick}>Back To Home</button>
      </div>
    </div>
  );
}
