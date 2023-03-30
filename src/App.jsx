import React from "react";
import Home from "./components/Home";
import Game from "./components/Game";
import categories from "./categories";

function App() {
  const [start, setStart] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [category, setCategory] = React.useState({
    category: "Any Category",
    type: "Mixed",
    difficulty: "Any Difficulty",
  });

  const [endPointData, setEndPointData] = React.useState({
    mode: "",
    noOfQuestions: "5",
    noOfRounds: "2",
    time: "2",
    category: "",
    difficulty: "",
    type: "",
  });

  const bodyStyleObj = document.body.style;
  bodyStyleObj.backgroundColor = darkMode ? "black" : "white";
  bodyStyleObj.color = darkMode ? "white" : "black";

  React.useEffect(() => {
    const filterCategories = categories.filter((category) => {
      return category.categoryNo == endPointData.category;
    });
    setCategory({
      category: filterCategories.at(0)?.categoryName || "Any Category",
      type: endPointData?.type || "Mixed",
      difficulty: endPointData?.difficulty || "Any Difficulty",
    });
  }, [endPointData]);

  function constructApiEndPoint() {
    const amount = endPointData.noOfQuestions,
      category = endPointData.category,
      type = endPointData.type,
      difficulty = endPointData.difficulty;

    const endPoint = `?amount=${amount}&category=${category}&type=${type}&difficulty=${difficulty}`;
    return endPoint;
  }

  function handleThemeChange(e) {
    setDarkMode(e.target.checked);
  }

  return start ? (
    <Game
      category={category}
      handleClick={() => setStart(false)}
      endPoint={constructApiEndPoint()}
      time={endPointData.time * 60}
      noOfRounds={endPointData.noOfRounds}
      mode={endPointData.mode}
      darkMode={darkMode}
    />
  ) : (
    <Home
      handleClick={() => setStart(true)}
      handleFormData={setEndPointData}
      handleThemeChange={handleThemeChange}
      darkMode={darkMode}
    />
  );
}

export default App;
