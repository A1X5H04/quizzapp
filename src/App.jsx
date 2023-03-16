// Imports

import React from "react";
import "./App.css";
import StartScr from "./components/StartScr";
import Game from "./components/Game";
import categories from "./categories";

// App Component
function App() {
  const [start, setStart] = React.useState(false);
  const [category, setCategory] = React.useState({
    category: "Any Category",
    type: "Mixed",
    difficulty: "Any Difficulty",
  });

  const [endPointData, setEndPointData] = React.useState({
    noOfQuestions: "5",
    category: "",
    difficulty: "",
    type: "",
  });

  function constructEndPoint() {
    setCategory({
      category: endPointData.category,
      type: endPointData.type,
      difficulty: endPointData.difficulty,
    });
  }

  console.log(endPointData);

  return start ? (
    <Game
      category={category}
      handleClick={() => setStart(false)}
      endPoint={constructEndPoint}
    />
  ) : (
    <StartScr
      handleClick={() => setStart(true)}
      handleFormData={setEndPointData}
    />
  );
}

export default App;
