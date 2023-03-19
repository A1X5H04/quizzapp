import React from "react";
import "./App.css";
import StartScr from "./components/StartScr";
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
    noOfQuestions: "5",
    noOfRounds: "2",
    category: "",
    difficulty: "",
    type: "",
  });

  const bodyStyle = {
    backgroundColor: darkMode ? "black" : "white",
    color: darkMode ? "white" : "black",
  };

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

  console.log(darkMode);

  return start ? (
    <Game
      category={category}
      handleClick={() => setStart(false)}
      endPoint={constructApiEndPoint()}
      darkMode={darkMode}
    />
  ) : (
    <StartScr
      handleClick={() => setStart(true)}
      handleFormData={setEndPointData}
      handleThemeChange={handleThemeChange}
      darkMode={darkMode}
    />
  );
}

export default App;
