import { useEffect, useState } from 'react'
import './App.css'
import PotionItem from './components/PotionItem'
import { potions } from './data/data'
import { Potion } from './types/Potion'
import Button from './components/Button'
import EffectFilter from './components/EffectFilter'
import LevelFilter from './components/LevelFilter'
import { findPotionByEffect } from './helpers/potionHelpers'


function App() {

  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>(potions);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);

  useEffect(() => {
    console.log("secondaryEffectText");
    console.log(secondaryEffectText);
  }, [secondaryEffectText]); 

  const handleClear = () => {
    setDisplayedPotions(potions);
  }

  const handleFilter = () => {

    let filteredPotions = displayedPotions;

    if (secondaryEffectText) {
      filteredPotions = findPotionByEffect(filteredPotions, secondaryEffectText);
    }

    setDisplayedPotions(filteredPotions);
  }


  return (
      <>
        <div className={`bg-gray-900 border-2 border-[#cda882] mb-3 p-3 gap-3 flex`}>
          
          <EffectFilter 
            setSecondaryEffectText={setSecondaryEffectText}
          />

          <LevelFilter />

          <Button 
            label='Filter' 
            onClick={handleFilter}
          />

          <Button 
            label='Clear' 
            onClick={handleClear}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {displayedPotions.length === 0 && (
            <h1>No condition fulfils the filter.</h1>
          )}
          {displayedPotions.map((potion, index) => {
            return <PotionItem potion={potion} key={index} />
          })}

        </div>
      </>
    )
}

export default App
