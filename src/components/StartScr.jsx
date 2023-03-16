import React from "react";
import Options from "./Options";

export default function StartScr(props) {
  const [showOption, setShowOption] = React.useState(false);

  return (
    <>
      <header>
        <div className="github-link">
          <p>
            Source Code on <a href="https://github.com/a1x5h04">Github</a>
          </p>
        </div>
        <div className="theme-toggle">
          <div className="toggle-border">
            <input type="checkbox" name="theme" id="theme-toggle" />
            <div className="toggle-thumb"></div>
            <img
              className="ic-sun"
              src="./src/assets/fi-bs-sun.svg"
              alt="Sun Icons"
            />
            <img
              className="ic-moon"
              src="./src/assets/fi-bs-moon.svg"
              alt="]Moon Icon"
            />
          </div>
        </div>
      </header>
      <div className="start-screen">
        <div className="start-image">
          <img src="./src/assets/brain.png" alt="Vector Brain Image" />
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
            />
          )}
        </div>
      </div>
    </>
  );
}
