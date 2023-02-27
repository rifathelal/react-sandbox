import { DragEvent, useState } from "react"

export default function Battleships() {
  const [playerBoard, setPlayerBoard] = useState(Array(100).fill("") as string[])
  const [cpuBoard, setCpuBoard] = useState(Array(100).fill("") as string[])
  
  return (
    <div className="flex items-center justify-center h-full gap-16">
      <ul className="grid grid-cols-10 bg-secondary gap-[1px] border border-primary select-none">
        { playerBoard.map((_, index) => 
          <li key={index} className="w-8 h-8 p-1 bg-primary"></li>)
        }
      </ul>
    </div>
  )
}