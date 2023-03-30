import { CrownSimple } from "@phosphor-icons/react";

export default function LeaderBoard(props) {
  return (
    <div className="modal-background">
      <div className="leaderboard modal">
        <header>
          <CrownSimple size={32} weight="fill" />
          <h3>LeaderBoard</h3>
        </header>
        <div className="content">
          <div className="leaderboard-container"></div>
          <div className="game-stats">
            <div>
              <p>Time Taken</p>
              <span>{12.34}</span>
            </div>
            <div>
              <p>Rounds Played</p>
              <span>{3}</span>
            </div>
            <div>
              <p>Game Played</p>
              <span>{9}</span>
            </div>
            <div>
              <p>Correct Answer</p>
              <span>{10}</span>
            </div>
            <div>
              <p>Wrong Answers</p>
              <span>{10}</span>
            </div>
            <div>
              <p>Total Questions</p>
              <span>{10}</span>
            </div>
          </div>
        </div>
        <button onClick={props.handleClick}>Clear Results</button>
      </div>
    </div>
  );
}
