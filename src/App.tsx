import './App.css'
import PotionItem from './components/PotionItem'
import { potions } from './data/data'

function App() {
  return (
    <div className='grid grid-cols-2 gap-3'>
      {potions.map(potion => {
        return <PotionItem potion={potion} />
      })}
    </div>
  )
}

export default App
