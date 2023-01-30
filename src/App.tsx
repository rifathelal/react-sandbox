import { useState } from "react";
import Header from "./components/Header";
import TicTacToe from "./components/TicTacToe";
import Battleships from "./components/Battleships";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true)
  }

  return(
    <div className={"flex flex-col w-full h-full bg-primary text-primary" + (darkMode ? ' dark' : '')}>
      <Header toggleDarkMode={toggleDarkMode}></Header>
      {/* <TicTacToe /> */}
      <Battleships />
    </div>
  )
}

export default App;