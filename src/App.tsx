import { useEffect, useState } from 'react'
// import { potions } from './data/data'
import { Potion } from './types/Potion'
import { findPotionByEffect, filterByLevelRequirement, getPotionsByRarity } from './helpers/potionHelpers'
import { getPotions } from './api/api'

import PotionItem from './components/PotionItem'
import Filters from './components/Filter'
import PotionModal from './components/PotionModal'

import {Spinner} from "@heroui/spinner";

function App() {

  const [potions, setPotions] = useState<Potion[]>([]);
  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>([]);
  const [modalPotion, setModalPotion] = useState<Potion|undefined>(undefined);

  const [levelValue, setLevelValue] = useState<number>(50);
  const [raritySelection, setRaritySelection] = useState<string|undefined>(undefined);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);
  const [craftTime, setCraftTime] = useState<string|undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    try {
      (async () => {
        setLoading(true);
        const potions = await getPotions();
        setPotions(potions);
        setDisplayedPotions(potions);
      })();
    } catch (error) {
      if (error instanceof Error) {
        console.log("There has been an error: ", error.message)
      } 
    } finally {
      setLoading(false);
    }
    
  }, []);

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


      {(loading || potions.length === 0) ?
          <div className='fixed top-0 left-0 flex h-full w-full justify-center items-center bg-black/50 z-50'>
            <Spinner size='lg' color='warning' className='scale-150' />
          </div>
        :
        <>
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
        </>
      }
      
     

      <div className='fixed bottom-4 w-[1815px] bg-red-700'>
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
