import { useEffect, useState } from 'react'
import { Potion } from './types/Potion'
import { findPotionByEffect, filterByLevelRequirement, getPotionsByRarity } from './helpers/potionHelpers'
import { getPotions } from './api/api'

import PotionItem from './components/PotionItem'
import Filters from './components/Filter'
import PotionModal from './components/PotionModal'

import Loading from './components/Loading'
// import { potions } from './data/data'

function App() {

  const [potions, setPotions] = useState<Potion[]>([]);
  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>([]);
  const [modalPotion, setModalPotion] = useState<Potion|undefined>(undefined);

  const [levelValue, setLevelValue] = useState<number>(50);
  const [raritySelection, setRaritySelection] = useState<string|undefined>(undefined);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);
  const [craftTime, setCraftTime] = useState<string|undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const potions = await getPotions();
        if (!potions) {throw new Error("There was an error getting the list of potions.")}
        setPotions(potions);
        setDisplayedPotions(potions);
      } catch (error) {
        if (error instanceof Error) {   
          setError(error.message);
          console.log("There has been an error: ", error.message)
        } 
      } finally {
        setLoading(false);
      }
    })();
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


      {(loading || (potions.length === 0 && !error)) ?
        <Loading />   
        :
        <>
          {error ?
          (
            <div className='w-full bg-gray-900 p-4 border-2 border-[#cda882]'>
              <h1 className='text-3xl italic'>There has been an internal error: {error}</h1>
            </div>
          )
          :
          (
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

            <div className='fixed left-[50%] translate-x-[-50%] bottom-4 w-[95%] max-w-[1880px] bg-red-700'>
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
          
        </>
      }
    </>
  )
}


export default App
