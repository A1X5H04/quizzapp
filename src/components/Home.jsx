import React from "react";
import Options from "./Options";
import { Brain, Sun, Moon } from "@phosphor-icons/react";
import LeaderBoard from "./LeaderBoard";

export default function StartScr(props) {
  const [showOption, setShowOption] = React.useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = React.useState(false);

  return (
    <>
      <header>
        <div className="github-link">
          <p>
            Source Code on{" "}
            <a href="https://github.com/a1x5h04/quizzapp">Github</a>
          </p>
        </div>
        <div className="theme-toggle">
          <div className="toggle-border">
            <input
              type="checkbox"
              name="theme"
              onChange={props.handleThemeChange}
              checked={props.darkMode}
              id="theme-toggle"
            />
            <div className="toggle-thumb"></div>
            <Sun className="ic-sun" size={32} weight="bold" color="white" />
            <Moon className="ic-moon" size={32} weight="bold" color="white" />
          </div>
        </div>
      </header>
      <div className="start-screen">
        <div className="start-image">
          <Brain className="brain-logo" size={150} weight="fill" />
          <h1>QuizZapp</h1>
          <p>Test Your QuizZ skills</p>
        </div>

        <div className="start-btns">
          <button onClick={props.handleClick}>Start Game</button>
          <button
            onClick={() => {
              setShowOption(true);
            }}
          >
            Options
          </button>
          {showOption && (
            <Options
              handleClick={() => {
                setShowOption(false);
              }}
              handleFormData={(prop) => props.handleFormData(prop)}
            />
          )}
        </div>
      </div>
    </>
  );
}
