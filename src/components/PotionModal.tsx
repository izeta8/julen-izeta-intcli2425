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

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 transition-all flex justify-center items-center"
      onClick={() => {setPotion(undefined)}}
    >
      <div
         className="bg-gray-900 border-2 border-[#cda882] p-3 w-7/12 h-5/12 flex justify-center items-center flex-col gap-5 rounded-sm"
         onClick={(e) => e.stopPropagation()}
      >

        {/* FIRST ROW */}
        <div>
          <h2 className="text-5xl uppercase font-bold my-5">{name}</h2>


            <div className="grid grid-cols-3">

              {/* Restriccioens de uso (nivel y clase) */}
              <div className="flex justify-center items-center flex-col">
                <p className="cursor-pointer" title="Required level" >
                  {/* <img src="/icons/level.png" className="w-10 rounded-full inline m-3" /> */}
                  Required Level: 
                  <span className="text-xl justify-center items-center h-full inline-block"> {levelRequirement}</span>
                </p>
                

                <p>Class Restrictions: </p>
                {classRestrictions.map((restriction) => <p>{restriction}</p>)}
              </div>

              {/* Aviso de uso, efectos secundarios */}
              <div className="flex justify-center items-center flex-col">
                {warnings.map(warning => <p className="text-xl text-red-200 italic">{warning}</p>)}
              </div>

              {/* Tiempo de creación e instrucciones de uso */}
              <div className="flex justify-center items-center flex-col">
                <p className="text-base">Crafting time: <span className="text-orange-300">{craftingTime}</span> minutes</p>
                {instructions.map(instruction => <p>{instruction}</p>)}
              </div>

            </div>
            
        </div>

        {/* SECOND ROW */}
        <div className="flex justify-center items-center">


          {/* Efectos primarios y secundarios */}
          <div className="flex justify-center items-center flex-col">

            <p className="text-2xl">Primary Effect</p>
            {renderEffect(primary)}

            <p className="text-2xl">Secondary Effects</p>
            {secondary.map((secondaryEffect) => renderEffect(secondaryEffect))}

          </div>

          {/* Ingredientes con su location y region de origen */}
          <div className="flex justify-center items-center flex-col">
            {ingredients.map((ingredient) => renderIngredient(ingredient))}
          </div>

        </div>

      </div>

    </div>
  )
}

const renderEffect = (effect: Effect) => {
  return (
    <p className="text-xl">{normalizeCamelCase(effect.attribute)} <span className="text-orange-200 italic text-sm">({effect.value})</span></p>
  )
}

const renderIngredient = (ingredient: Ingredient) => {
  return (
    <>
      <p className="text-2xl">{ingredient.name}</p>
      <p className="text-base opacity-50">Location: {ingredient.origin.location}</p>
      <p className="text-base opacity-50">Regtion: {ingredient.origin.region}</p>
    </>
  )
}

export default PotionModal;