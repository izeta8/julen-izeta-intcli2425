
import { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({label, onClick}) => {
  return (
    <button 
      className="border p-2 rounded-sm hover:bg-white hover:text-slate-950 transition-all duration-300 text-white bg-slate-950"
      onClick={(e) => onClick(e)}
    >
        {label}
    </button>
  )
}



export default Button;