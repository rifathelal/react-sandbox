import { useState } from "react";
import { ReactComponent as Cross } from '../assets/cross.svg';
import { ReactComponent as Circle } from '../assets/circle.svg';

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [winner, setWinner] = useState("")
  const [board, setBoard] = useState(Array(9).fill(null) as (string|null)[])
  
  const setValue = (i: number) => {
    if (winner) return;
    if (!board[i]) {
      const newBoard = board.slice();
      newBoard[i] = currentPlayer;
      setBoard(newBoard);
      let winner = checkForWinner(newBoard);
      if (winner) {
        setWinner(winner)
        setCurrentPlayer("");
      } else setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
    }
  }

  const restartGame = () => {
    setWinner("")
    setCurrentPlayer("X")
    setBoard(Array(9).fill(null))
  }

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

  const checkForWinner = (board: (string|null)[]) => {
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

  return (
    <div className="flex-1 flex flex-col gap-8 all-center">
      <h1>Tic Tac Toe</h1>
      <div className="grid grid-cols-3 bg-secondary gap-[1px] select-none">
        {[...Array(9)].map((_, i) =>
          <div key={i}
          className="w-20 h-20 bg-primary p-4 all-center"
          onClick={() => setValue(i)}
          >
            { 
              board[i] == "X" ? <Cross className="stroke-secondary" /> :
              board[i] == "O" ? <Circle className="stroke-secondary" /> : <></>
            }
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {winner ? <>
          <h2>Winner:</h2>
          {
            winner == "X" ? <Cross className="stroke-secondary w-8" /> :
            winner == "O" ? <Circle className="stroke-secondary w-8" /> : <></>
          }
        </> : <>
          <h2>Current Player:</h2>
          {
            currentPlayer == "X" ? <Cross className="stroke-secondary w-8" /> :
            currentPlayer == "O" ? <Circle className="stroke-secondary w-8" /> : <></>
          }
        </>}
      </div>
      <div className="h-12">
        <button onClick={restartGame} className={ !winner ? 'hidden' : '' }>Restart</button>
      </div>
    </div>
  )
}

export default TicTacToe;