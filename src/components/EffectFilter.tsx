
import { SyntheticEvent } from "react";

interface EffectFilterProps {
  setSecondaryEffectText: Function;
}

const EffectFilter: React.FC<EffectFilterProps> = ({setSecondaryEffectText}) => {

  const handleInputChange = (e: SyntheticEvent) => {
    setSecondaryEffectText(e.target.value);
  }
  
  return (
    <input type="text" placeholder="Filter by secondary effect" className="p-2 w-52" onChange={handleInputChange} />
  )

}

export default EffectFilter;