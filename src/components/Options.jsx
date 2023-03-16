import React from "react";
import categories from "../categories";

export default function Options(props) {
  const categoryElm = categories.map((item) => {
    return <option value={item.categoryNo}>{item.categoryName}</option>;
  });

  const [formData, setFormData] = React.useState({
    noOfQuestions: "5",
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
  }

  return (
    <div className="modal-background">
      <div className="modal">
        <a onClick={props.handleClick}>
          <img src="./src/assets/fi-bs-cross-small.svg" alt="Close Icon" />
        </a>
        <header>
          <h3>Options</h3>
        </header>

        <div className="options-container">
          <div className="input-container">
            <label htmlFor="input-number">Number of Questions</label>
            <input
              type="number"
              name="noOfQuestions"
              id="input-number"
              max={25}
              min={5}
              onChange={handleFormChange}
              value={formData.noOfQuestions}
            />
          </div>

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
          <button onClick={props.handleClick} id="setdefault-btn">
            Discard
          </button>
          <button onClick={handleSubmit} id="save-btn">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
