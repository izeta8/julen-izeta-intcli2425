import { useEffect, useState } from 'react'
import './App.css'
import PotionItem from './components/PotionItem'
import { potions } from './data/data'
import { Potion } from './types/Potion'
import EffectFilter from './components/EffectFilter'
import LevelFilter from './components/LevelFilter'
import { findPotionByEffect, filterByLevelRequirement } from './helpers/potionHelpers'


function App() {

  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>(potions);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);
  const [levelValue, setLevelValue] = useState<number>(50);

  useEffect(() => {
    handleFilter();
  }, [secondaryEffectText, levelValue]); 

  // const handleClear = () => {
  //   setDisplayedPotions(potions);
  // }

  const handleFilter = () => {

    let filteredPotions = potions;

    // Filter by level slider.
    filteredPotions = filterByLevelRequirement(filteredPotions, levelValue);

    // Filter by secondary effect.
    if (secondaryEffectText) {
      console.log(filteredPotions);

      filteredPotions = findPotionByEffect(filteredPotions, secondaryEffectText);
    }



    setDisplayedPotions(filteredPotions);
  }




  return (
      <>
        <div className={`bg-gray-900 border-2 border-[#cda882] mb-3 p-3 gap-3 flex`}>
          
          <LevelFilter 
            inputValue={levelValue}
            setLevelValue={setLevelValue}
          />


          <EffectFilter 
            setSecondaryEffectText={setSecondaryEffectText}
          />


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
