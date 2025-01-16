import { useEffect, useState } from 'react'
import './App.css'
import { potions } from './data/data'
import { Potion } from './types/Potion'
import { findPotionByEffect, filterByLevelRequirement, getPotionsByRarity } from './helpers/potionHelpers'


import PotionItem from './components/PotionItem'
import Filters from './components/Filter'
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

        {/* Render Potions */}
        <div className='grid grid-cols-5 gap-3'>
          {displayedPotions.map((potion, index) => {
            return <PotionItem potion={potion} setModalPotion={setModalPotion} key={index} />
          })}

        </div>

        {/* Message if no potion is displayed */}
        {displayedPotions.length === 0 && (
          <div className='w-full bg-gray-900 p-4 border-2 border-[#cda882]'>
            <h1 className='text-3xl italic'>There is no potion that matches the filter.</h1>
          </div>
        )}

        <div className='fixed bottom-4 w-[1815px]'>
          <Filters 
            levelValue={levelValue}
            setLevelValue={setLevelValue}
            setRaritySelection={setRaritySelection}
            setSecondaryEffectText={setSecondaryEffectText}
            craftTime={craftTime}
            setCraftTime={setCraftTime}
            displayedPotions={displayedPotions}
          />
        </div>

      </>
    )
}


export default App
