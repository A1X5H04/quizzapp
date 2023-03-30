import React from "react";
import { FadersHorizontal } from "@phosphor-icons/react";
import categories from "../categories";

export default function Options(props) {
  const categoryElm = categories.map((item) => {
    return <option value={item.categoryNo}>{item.categoryName}</option>;
  });

  const [formData, setFormData] = React.useState({
    mode: "",
    noOfQuestions: "5",
    noOfRounds: "2",
    time: "2",
    category: "",
    difficulty: "",
    type: "",
  });

  function handleFormChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit() {
    props.handleFormData(formData);
    props.handleClick();
  }

  return (
    <>
      <div className="modal-background">
        <div className="modal">
          <header>
            <FadersHorizontal size={32} weight="fill" />
            <h3>Options</h3>
          </header>
          <div className="options-container">
            <div className="input-container">
              <label htmlFor="input-mode">Select Game Mode</label>
              <select
                name="mode"
                id="input-mode"
                value={formData.mode}
                onChange={handleFormChange}
              >
                <option value="">Casual</option>
                <option value="time">Time</option>
                <option value="round">Round</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="input-number">Number of Questions</label>
              <input
                type="range"
                name="noOfQuestions"
                id="input-number"
                max={50}
                min={5}
                onChange={handleFormChange}
                value={formData.noOfQuestions}
              />
              <p>
                Value: <span>{formData.noOfQuestions}</span>
              </p>
            </div>
            {formData.mode == "round" && (
              <div className="input-container">
                <label htmlFor="input-round">Number of Rounds</label>
                <input
                  type="range"
                  name="noOfRounds"
                  id="input-round"
                  max={15}
                  min={2}
                  onChange={handleFormChange}
                  value={formData.noOfRounds}
                />
                <p>
                  Value: <span>{formData.noOfRounds}</span>
                </p>
              </div>
            )}

            {formData.mode == "time" && (
              <div className="input-container">
                <label htmlFor="input-round">Time {" (in Minutes)"}</label>
                <input
                  type="range"
                  name="time"
                  id="input-round"
                  max={30}
                  min={2}
                  onChange={handleFormChange}
                  value={formData.time}
                />
                <p>
                  Value: <span>{formData.time}</span>
                </p>
              </div>
            )}

            <div className="input-container">
              <label htmlFor="input-category">Select Category</label>
              <select
                name="category"
                id="input-category"
                value={formData.category}
                onChange={handleFormChange}
              >
                <option value="">Any Category</option>
                {categoryElm}
              </select>
            </div>

            <div className="input-container">
              <label htmlFor="input-difficulty">Select Difficulty</label>
              <select
                name="difficulty"
                id="input-difficulty"
                value={formData.difficulty}
                onChange={handleFormChange}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="input-container">
              <label htmlFor="input-type">Select Type</label>
              <select
                name="type"
                id="input-type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
          </div>

          <div className="option-btn-container">
            <button onClick={props.handleClick}>Discard</button>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

// <div>
// <button>
//   <img src="./src/assets/caret-left.svg" alt="Decrease" />
// </button>
// <div>{count}</div>
// <button>
//   <img src="./src/assets/caret-right.svg" alt="Increase" />
// </button>
// </div>
