
import Button from "./Button";
import { calculateCraftingTime } from "../helpers/potionHelpers";
import { Potion } from "../types/Potion";

interface CraftTimeButtonProps {
  craftTime: string|undefined;
  setCraftTime: Function;
  potions: Potion[];
}

const CraftTimeButton: React.FC<CraftTimeButtonProps> = ({craftTime, setCraftTime, potions}) => {

  const handleCraftTime = () => {
    const craftingTime = calculateCraftingTime(potions);
    setCraftTime(`${craftingTime} minutes`);
  }

  return (
    <>
      <Button 
        label="Craft Time"
        onClick={handleCraftTime}
      />
      {craftTime && (<p>{craftTime}</p>)}
    </>
  )

}

export default CraftTimeButton;