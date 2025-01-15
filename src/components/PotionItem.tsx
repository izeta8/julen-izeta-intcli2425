import { Potion } from "../types/Potion";
import { capitalizeFirstLetter } from "../helpers/utils";
import Button from "./Button";

interface PotionItemProps {
  potion: Potion
}

const PotionItem: React.FC<PotionItemProps> = ({potion}) => {

  const {name, image, rarity} = potion;
  const availability = potion.meta.availability.drop_rate;
  const {boss, chance: dropChance} = availability;

  return (
    <div className={`bg-gray-900 border-2 border-[#cda882] grid grid-cols-[9rem_1fr] rounded-sm`}>
      {/* Image */}
      <div>
        <img src={`/${image}`} className="w-full border-[#cda882] border-r" />
      </div>

      {/* Texts */}
      <div className="w-full flex flex-wrap p-2 items-center">

        <p className="text-xl text-center w-full unde">
          {name}
        </p>

        <p className="text-center w-full italic text-gray-500">
          {capitalizeFirstLetter(rarity)}
        </p>
        
        <p className="w-full">
          <span className="text-orange-300">{dropChance} </span>
          of change to be dropped by 
          <span className="text-purple-400"> {boss}</span>
        </p>

        <div className="w-full">
        <Button 
          label="See more"
          onClick={() => {console.log("CLICKED")}}
        />
        </div>

      </div>
    </div>
  )


}

export default PotionItem;