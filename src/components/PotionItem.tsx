import { Potion } from "../types/Potion";
import { capitalizeFirstLetter } from "../helpers/utils";
import Button from "./Button";

interface PotionItemProps {
  potion: Potion;
  setModalPotion: Function;
}

const PotionItem: React.FC<PotionItemProps> = ({potion, setModalPotion}) => {

  const {name, image, rarity} = potion;
  const availability = potion.meta.availability.drop_rate;
  const {boss, chance: dropChance} = availability;

  return (
    <div className={`bg-gray-900 border-2 border-[#cda882] rounded-sm p-3 gap-3 flex flex-col justify-center items-center`}>

        <div className="flex justify-center items-center">
          <img src={`/potions/${image}`} className="w-24 border-[#cda882] border rounded-md" />
        </div>

        <p className="text-3xl text-center w-full">
          {name}
        </p>

        <p className="text-center w-full italic text-gray-500 text-2xl">
          {capitalizeFirstLetter(rarity)}
        </p>
        
        <p className="w-full text-2xl">
          <span className="text-orange-300">{dropChance} </span>
          of change to be dropped by 
          <span className="text-purple-400"> {boss}</span>
        </p>

        <div className="w-full">
        <Button 
          label="See more"
          onClick={() => {setModalPotion(potion)}}
        />
        </div>

    </div>
  )


}

export default PotionItem;