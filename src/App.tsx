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

function App() {

  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>(potions);

  const [levelValue, setLevelValue] = useState<number>(50);
  const [raritySelection, setRaritySelection] = useState<string|undefined>(undefined);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);
  const [craftTime, setCraftTime] = useState<string|undefined>(undefined);

  useEffect(() => {
    handleFilter();
  }, [secondaryEffectText, levelValue, raritySelection]); 

  const handleFilter = () => {

    const displayedAmount = displayedPotions.length;
    let filteredPotions = potions;

    // Filter by level slider.
    filteredPotions = filterByLevelRequirement(filteredPotions, levelValue);

    // Filter by rarity.
    if (raritySelection && raritySelection !== "Filter by rarity") {
      filteredPotions = getPotionsByRarity(filteredPotions, raritySelection);
    }

    // Filter by secondary effect.
    if (secondaryEffectText) {
      console.log(filteredPotions);

      filteredPotions = findPotionByEffect(filteredPotions, secondaryEffectText);
    }

    // If any filter changes 
    if (filteredPotions.length !== displayedAmount) {
      setCraftTime(undefined);
    }

    setDisplayedPotions(filteredPotions);
  }


  return (
      <>
        <div className={`bg-gray-900 border-2 border-[#cda882] mb-3 p-3 gap-3 grid grid-cols-4`}>
          
          <div>
            <LevelFilter 
              inputValue={levelValue}
              setLevelValue={setLevelValue}
            />
          </div>

          <div>
            <RarityFilter
              setRaritySelection={setRaritySelection}
            />
          </div>

          <div>
            <EffectFilter 
              setSecondaryEffectText={setSecondaryEffectText}
            />
          </div>

          <div>
            <CraftTimeButton
              craftTime={craftTime}
              setCraftTime={setCraftTime}
              potions={displayedPotions}          
            />
          </div>


        </div>
        <div className='grid grid-cols-2 gap-3'>
          {displayedPotions.length === 0 && (
            <h1>No condition fullfils the filter.</h1>
          )}
          {displayedPotions.map((potion, index) => {
            return <PotionItem potion={potion} key={index} />
          })}

        </div>
      </>
    )
}

export default App
