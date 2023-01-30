import { ReactComponent as Moon } from '../assets/moon.svg';
import { MouseEventHandler } from "react";

export default function Header(props: { toggleDarkMode: MouseEventHandler<HTMLButtonElement> }) {
  return(
    <header className='flex w-full justify-end p-4'>
      <button onClick={props.toggleDarkMode} className="w-8 h-8">
        <Moon className='stroke-secondary'/>
      </button>
    </header>
  )
}
