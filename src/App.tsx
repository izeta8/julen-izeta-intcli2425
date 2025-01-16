import { useEffect, useState } from 'react'
import './App.css'
import PotionItem from './components/PotionItem'
import { potions } from './data/data'
import { Potion } from './types/Potion'
import EffectFilter from './components/EffectFilter'
import LevelFilter from './components/LevelFilter'
import { findPotionByEffect, filterByLevelRequirement, getPotionsByRarity } from './helpers/potionHelpers'
import RarityFilter from './components/RarityFilter'
import CraftTimeButton from './components/CraftTimeButton'
import PotionModal from './components/PotionModal'

function App() {

  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>(potions);
  const [modalPotion, setModalPotion] = useState<Potion|undefined>(undefined);

  const [levelValue, setLevelValue] = useState<number>(50);
  const [raritySelection, setRaritySelection] = useState<string|undefined>(undefined);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);
  const [craftTime, setCraftTime] = useState<string|undefined>(undefined);

  useEffect(() => {
    handleFilter();
  }, [secondaryEffectText, levelValue, raritySelection]); 

  const handleFilter = () => {

    // If any filter changes remove the craft time button. 
    setCraftTime(undefined);

    let filteredPotions = potions;

    // Filter by level slider.
    filteredPotions = filterByLevelRequirement(filteredPotions, levelValue);

    // Filter by rarity.
    if (raritySelection && raritySelection !== "Filter by rarity") {
      filteredPotions = getPotionsByRarity(filteredPotions, raritySelection);
    }

    // Filter by secondary effect.
    if (secondaryEffectText) {
      filteredPotions = findPotionByEffect(filteredPotions, secondaryEffectText);
    }

    setDisplayedPotions(filteredPotions);
  }


  return (
      <>
        {modalPotion && (
          <PotionModal
            potion={modalPotion}
            setPotion={setModalPotion}
          />
        )}

        <div className={`bg-gray-900 border-2 border-[#cda882] mb-3 p-3 gap-3 flex justify-around`}>
          
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
        <div className='grid grid-cols-2 gap-3'>
          {displayedPotions.map((potion, index) => {
            return <PotionItem potion={potion} setModalPotion={setModalPotion} key={index} />
          })}

        </div>

        {displayedPotions.length === 0 && (
          <div className='w-full bg-gray-900 p-4 border-2 border-[#cda882]'>
            <h1 className='text-xl italic'>There is no potion that matches the filter.</h1>
          </div>
        )}

      </>
    )
}

export default App
