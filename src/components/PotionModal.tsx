import { Potion } from "../types/Potion";
import { normalizeCamelCase, parseTime } from "../helpers/utils";
import { Effect } from "../types/Effect";
import { Ingredient } from "../types/Ingredient";

interface PotionModalProps {
  potion: Potion;
  setPotion: Function;
}

const PotionModal: React.FC<PotionModalProps> = ({potion, setPotion}) => {

  const {name} = potion;
  const {primary, secondary} = potion.effects;
  const ingredients = potion.ingredients; 
  const {levelRequirement, classRestrictions, warnings} = potion.usage.restrictions;
  const instructions = potion.usage.instructions;
  const craftingTime = parseTime(potion.crafting.time);

  const restrictionsText = classRestrictions.join(", ");

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/60 transition-all flex justify-center items-center"
      onClick={() => {setPotion(undefined)}}
    >
      <div
        className="relative bg-gray-900 border-2 border-[#cda882] px-3 py-4 w-7/12 rounded-md grid-cols-[1fr_650px_1fr] grid"
        onClick={(e) => e.stopPropagation()}
      >

      {/* CLOSE BUTTON */}
      <p 
        className="absolute right-5 top-3 bg-black/50 border-2 border-[#cda882] px-3 py-1 justify-center align-center rounded-md font-bold hover:scale-105 hover:cursor-pointer transition-all z-10"
        onClick={() => {setPotion(undefined)}}
      >
        X
      </p>

      {/* LEFT COLUMN */}
      <div className="bg-red-700/00 flex flex-col justify-center relative">
              
        {/* Restriccioens de uso (nivel y clase) */}
        <div className="flex justify-center items-center flex-col absolute top-9 w-full">

          <p className="cursor-pointer text-3xl" title="Required level">
            Required Level: 
            <span className="text-3xl justify-center items-center h-full inline-block text-orange-200">&nbsp; {levelRequirement}</span>
          </p>
        </div>

        {/* Aviso de uso, efectos secundarios */}
        <div className="flex justify-center items-center flex-col">
          {warnings.map(warning => <p className="text-3xl text-red-200 italic">{warning}</p>)}
        </div>

        <div className="absolute bottom-9 w-full text-balance">
          <p className="w-full text-2xl">Class Restrictions: <span className="text-orange-100"> {restrictionsText}</span></p>
        </div>

      </div>

      {/* MIDDLE COLUMN */}
      <div className="bg-blue-400/00">

        <h1 className="text-5xl uppercase font-bold my-5 text-balance">{name}</h1>

        <div className="grid grid-cols-2 ">

          {/* Efectos primarios y secundarios */}
          <div className="flex items-center flex-col mt-3">


            <div className="mb-8">
              <h2 className="text-3xl my-4 underline">Primary Effects</h2>
              {/* <p className="text-2xl italic">Primary Effect</p> */}
              {renderEffect(primary)}
            </div>

            <div>
              <h2 className="text-3xl my-4 underline">Secondary Effects</h2>
              {/* <p className="text-2xl">Secondary Effects</p> */}
              {secondary.map((secondaryEffect) => renderEffect(secondaryEffect))}
            </div>

          </div>

          {/* Ingredientes con su location y region de origen */}
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-3xl my-4 underline">Ingredients</h2>
            {ingredients.map((ingredient) => renderIngredient(ingredient))}
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="bg-red-700/00 flex flex-col justify-center relative">
        
        {/* Crafting time */}
        <p className="text-3xl absolute top-11 w-full text-center">Crafting time: <span className="text-orange-300">{craftingTime}</span> mins</p>

        {/* Instrucciones de uso */}
        <div className="flex justify-center items-center flex-col">
          {instructions.map(instruction => <p className="text-3xl italic my-2 text-blue-100">{instruction}</p>)}
        </div>

      </div>


    </div>
  </div>
  )
}

const renderEffect = (effect: Effect) => {
  return (
    <p className="text-3xl">{normalizeCamelCase(effect.attribute)} <span className="text-orange-200 italic text-base">({effect.value})</span></p>
  )
}

const renderIngredient = (ingredient: Ingredient) => {
  return (
    <div className="mb-4">
      <p className="text-3xl">{ingredient.name}</p>
      <p className="text-2xl opacity-50 italic">Location: {ingredient.origin.location}</p>
      <p className="text-2xl opacity-50 italic">Regtion: {ingredient.origin.region}</p>
    </div>
  )
}

export default PotionModal;