import categories from "../categories";

export default function Options(props) {
  const categoryElm = categories.map((item) => {
    return <option value={item.categoryNo}>{item.categoryName}</option>;
  });

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
            <input type="number" id="input-number" max={25} min={5} />
          </div>

          <div className="input-container">
            <label htmlFor="input-category">Select Category</label>
            <select name="name" id="input-category">
              <option value="default">Any Category</option>
              {categoryElm}
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="input-difficulty">Select Difficulty</label>
            <select name="name" id="input-difficulty">
              <option value="default">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="input-type">Select Type</label>
            <select name="name" id="input-type">
              <option value="default">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>
          </div>

          <div className="option-btn-container">
            <button id="setdefault-btn">Set Defaults</button>
            <button id="save-btn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
