import { useEffect, useState } from 'react'
import './App.css'
import PotionItem from './components/PotionItem'
import { potions } from './data/data'
import { Potion } from './types/Potion'
import EffectFilter from './components/EffectFilter'
import Button from './components/Button'

function App() {

  const [displayedPotions, setDisplayedPotions] = useState<Potion[]>(potions);
  const [secondaryEffectText, setSecondaryEffectText] = useState<string|undefined>(undefined);

  useEffect(() => {
    console.log("secondaryEffectText");
    console.log(secondaryEffectText);
  }, [secondaryEffectText]); 

  return (
      <>
        <div className={`bg-gray-900 border-2 border-[#cda882] mb-3 p-3 gap-3 flex`}>
          
          <EffectFilter 
            setSecondaryEffectText={setSecondaryEffectText}
          />

          <Button 
            label='Filter' 
            />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {displayedPotions.map((potion, index) => {
            return <PotionItem potion={potion} key={index} />
          })}
        </div>
      </>
    )
}

export default App
