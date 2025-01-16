interface RarityFilterProps {
  setRaritySelection: Function
}

const RarityFilter: React.FC<RarityFilterProps> = ({setRaritySelection}) => {

  return (
    <select className="w-full text-center bg-gray-900 border-2 border-[#cda882]" name="select" defaultValue={undefined} onChange={(e) => setRaritySelection(e.target.value)}>
      <option value={undefined} className="italic text-white/60">Filter by rarity</option>
      <option value="legendary">Legendary</option>
      <option value="epic">Epic</option>
      <option value="mythic">Mythic</option>
    </select>
  )

}

export default RarityFilter;