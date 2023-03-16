// Imports

import React from "react";
import "./App.css";
import StartScr from "./components/StartScr";
import Game from "./components/Game";

// App Component
function App() {
  const [start, setStart] = React.useState(false);
  const [category, setCategory] = React.useState({
    category: "Any Category",
    type: "Mixed",
    difficulty: "Any Difficulty",
  });

  return start ? (
    <Game category={category} handleClick={() => setStart(false)} />
  ) : (
    <StartScr handleClick={() => setStart(true)} />
  );
}

export default App;
