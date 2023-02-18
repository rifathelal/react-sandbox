import { useState } from "react"
import { ReactComponent as Cross } from "../assets/cross.svg";
import { ReactComponent as Circle } from "../assets/circle.svg";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill("") as string[]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const answers = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWinner = (board: string[]) => {
    for (let answer of answers) {
      let a = board[answer[0]]
      let b = board[answer[1]]
      let c = board[answer[2]]
      if ((a && b && c) && a == b && b == c) {
        return a;
      }
    }
    return "";
  }

  const setMark = (index: number) => {
    if (winner) return;
    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
    const w = checkForWinner(newBoard);
    if (w) setWinner(w)
    else if (newBoard.findIndex(x => x == "") == -1) { // empty
      setWinner("draw")
    }
  }

  const restartGame = () => {
    setWinner("")
    setCurrentPlayer("X")
    setBoard(Array(9).fill(""))
  }
  
  const svgclass = "stroke-secondary fill-secondary";

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <ul className="grid grid-cols-3 bg-secondary gap-[1px] border border-primary select-none">
        {[...Array(9)].map((_, i) => 
          <li className="w-20 h-20 p-1 bg-primary" key={i}>
            { 
              board[i] == "X" ? <Cross title={`${i+1}${board[i]}`} className={svgclass} /> :
              board[i] == "O" ? <Circle title={`${i+1}${board[i]}`} className={svgclass} /> :
              <button onClick={() => setMark(i)} className="w-full h-full"/>
            }
          </li> 
        )}
      </ul>
      <div className="flex items-center gap-2">
        <h2>{ !!winner ? (winner == "draw" ? "Draw" : "Winner: ") : "Current Player: "}</h2>
        { 
          winner == "X" ? <Cross title="winnerX" className={`${svgclass} w-12`} /> :
          winner == "O" ? <Circle title="winnerO" className={`${svgclass} w-12`} /> :
          winner == "draw" ? <></> :
          currentPlayer == "X" ? <Cross title="currentPlayerX" className={`${svgclass} w-12`} /> :
          currentPlayer == "O" ? <Circle title="currentPlayerO" className={`${svgclass} w-12`} /> : <></>
        }
      </div>
      { winner ? 
        <button className="border border-primary p-2 rounded-sm" onClick={restartGame}>Restart</button> : 
        <span>&nbsp;</span>
      }
    </div>
  )
}