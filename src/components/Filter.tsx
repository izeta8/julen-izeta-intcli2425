import EffectFilter from './EffectFilter'
import LevelFilter from './LevelFilter'
import RarityFilter from './RarityFilter'
import CraftTimeButton from './CraftTimeButton'
import { Potion } from '../types/Potion'

interface FiltersProps {
  levelValue: number;
  setLevelValue: Function;
  setRaritySelection: Function;
  setSecondaryEffectText: Function;
  craftTime: string|undefined;
  setCraftTime: Function;
  displayedPotions: Potion[];
}

const Filters: React.FC<FiltersProps> = ({
  levelValue,
  setLevelValue,
  setRaritySelection,
  setSecondaryEffectText,
  craftTime,
  setCraftTime,
  displayedPotions,
}) => {
  return (
    <div className={`bg-gray-900 border-2 border-[#cda882] p-3 gap-3 flex justify-around`}>
          
      <div className='bg-slate-600 justify-center align-center flex w-96'>
        <LevelFilter 
          inputValue={levelValue}
          setLevelValue={setLevelValue}
        />
      </div>

      <div className='justify-center align-center flex w-60'>
        <RarityFilter
          setRaritySelection={setRaritySelection}
        />
      </div>

      <div className='justify-center align-center flex w-60'>
        <EffectFilter 
          setSecondaryEffectText={setSecondaryEffectText}
        />
      </div>

      <div className='justify-center align-center flex flex-col w-52'>
        <CraftTimeButton
          craftTime={craftTime}
          setCraftTime={setCraftTime}
          potions={displayedPotions}          
        />
      </div>


    </div>
  )
}

export default Filters;