import { MouseEvent, useState } from "react"

export default function Battleships() {
  const [playerBoard, setPlayerBoard] = useState(Array(100).fill("") as string[])
  const [cpuBoard, setCpuBoard] = useState(Array(100).fill("") as string[])

  type Ship = { size: number, isHorizontal: boolean, index: number }
  const [selectedShip, setSelectedShip] = useState(null as Ship | null);
  
  function handleMoveShip(e: MouseEvent) {
    if (!selectedShip) return;

    let rect = e.currentTarget.getBoundingClientRect();
    let mouseY = Math.max(e.pageY - rect.top, 0);
    let mouseX = Math.max(e.pageX - rect.left, 0);
    let x = Math.floor(mouseX * 10 / (rect.right - rect.left))
    let y = Math.floor(mouseY * 10 / (rect.bottom - rect.top))

    let shipX, shipY;
    if (selectedShip.isHorizontal) {
      shipX = 
        x + Math.floor(selectedShip.size/2) > 9 ? 9 - Math.floor(selectedShip.size/2) :
        x - Math.floor(selectedShip.size/2) < 0 ? Math.floor(selectedShip.size/2) : 
        x;
      shipY = y;
    } else {
      shipY = 
        y + Math.floor(selectedShip.size/2) > 9 ? 9 - Math.floor(selectedShip.size/2) :
        y - Math.floor(selectedShip.size/2) < 0 ? Math.floor(selectedShip.size/2) : 
        y;
      shipX = x;
    }

    let board = playerBoard.slice()
    for(let i=0; i < board.length; i++) {
      if (board[i] == "temp") board[i] = ""
    }

    for (let i = 0; i < selectedShip.size; i++) {
      let index
      if (selectedShip.isHorizontal) {
        index = shipY * 10 + (shipX - Math.floor(selectedShip.size/2) + i)
      }
      else index = (shipY - Math.floor(selectedShip.size/2) + i) * 10 + shipX
      board[index] = board[index] == "" ? "temp" : board[index]
    }
    setPlayerBoard(board)
  }

  function clearBoardPlacement() {
    let board = playerBoard.slice()
    for(let i=0; i < board.length; i++) {
      if (board[i] == "temp") board[i] = ""
    }
    setPlayerBoard(board);
  }

  function handleSetShip() {
    if (!selectedShip) return;
    let board = playerBoard.slice()
    for(let i=0; i < board.length; i++) {
      if (board[i] == "temp") board[i] = `${selectedShip.index}`
    }
    setPlayerBoard(board);
    setSelectedShip(null);
  }

  function handleSelectShip() {
    const ship: Ship = { index: 0, size: 5, isHorizontal: true }
    let board = playerBoard.slice()
    for(let i = 0; i < board.length; i++) {
      if (board[i] == `${ship.index}`) board[i] = ""
    }
    setPlayerBoard(board);
    setSelectedShip({size: 5, isHorizontal: true, index: 0})
  }

  return (
    <div className="flex items-center justify-center h-full gap-16">
      <ul 
        className="grid grid-cols-10 bg-secondary gap-[1px] border border-primary select-none"
        onMouseMove={handleMoveShip}
        onMouseLeave={() => { clearBoardPlacement(); setSelectedShip(null) }}
        onClick={handleSetShip}
      >
        { playerBoard.map((_, i) => <li 
          key={i} 
          className={`w-8 h-8 p-1 ${
            playerBoard[i] == "temp" ? 'bg-green-200' : 
            playerBoard[i] != "" ? 'bg-yellow-400' :
            'bg-primary'
          }`}
        ></li>) }
      </ul>
      <button onClick={handleSelectShip}>Big Ship</button>
    </div>
  )
}