import { useEffect, useRef, useState } from "react"

export default function Battleships() {
  const [playerBoard, setPlayerBoard] = useState(Array(100).fill("") as string[])
  const [cpuBoard, setCpuBoard] = useState(Array(100).fill("") as string[])
  
  function dragElement(elem: HTMLElement) {
    var initialX = "0px", initialY = "0px", mx = 0, my = 0;
    elem.onmousedown = setDraggable;

    function setDraggable(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      mx = e.clientX
      my = e.clientY
      initialX = elem.style.top;
      initialY = elem.style.left;
      document.onmousemove = drag;
      elem.onmouseup = setUndraggable;
    }

    function drag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      let newX = mx - e.clientX;
      let newY = my - e.clientY;
      mx = e.clientX;
      my = e.clientY
      elem.style.top = (elem.offsetTop - newY) + "px";
      elem.style.left = (elem.offsetLeft - newX) + "px";
    }

    function setUndraggable() {
      elem.style.top = initialY;
      elem.style.left = initialX;
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const draggable = useRef(null as HTMLButtonElement|null);
  useEffect(() => {
    if (!draggable.current) return;
    console.log("bruh")
    dragElement(draggable.current)
  }, [draggable.current])

  // const ships = [
  //   { size: 5, isHorizontal: false, x: 0, y: 0 },
  //   { size: 4, isHorizontal: false, x: 0, y: 0 },
  //   { size: 3, isHorizontal: false, x: 0, y: 0 },
  //   { size: 3, isHorizontal: false, x: 0, y: 0 },
  //   { size: 2, isHorizontal: false, x: 0, y: 0 },
  // ]
  // const [playerShips, setPlayerShips] = useState(ships);
  // const onShipClick = (index: number) => {
  //   const newShips = ships.slice();
  //   newShips[index].isHorizontal = !newShips[index].isHorizontal;
  //   setPlayerShips(newShips);
  // } 
  
  return (
    <div className="flex items-center justify-center h-full gap-16">
      <ul className="grid grid-cols-10 bg-secondary gap-[1px] border border-primary select-none">
        { playerBoard.map((_, index) => 
          <li key={index} className="w-8 h-8 p-1 bg-primary"></li>)
        }
      </ul>
      <ul className="flex flex-col gap-2">
        {/* { ships.map((ship, index) => 
          <button 
            onClick={() => { onShipClick(index) }} 
            className="h-8 border border-secondary"
            style={{width: `${ship.size * 2}rem`}}
          ></button>
        )} */}
        <button className="absolute" ref={draggable}>Bruh</button>
      </ul>
    </div>
  )
}