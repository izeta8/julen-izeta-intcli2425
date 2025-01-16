interface RarityFilterProps {
  setRaritySelection: Function
}

const RarityFilter: React.FC<RarityFilterProps> = ({setRaritySelection}) => {

  return (
    <select name="select"  defaultValue={undefined} onChange={(e) => setRaritySelection(e.target.value)}>
      <option value={undefined}>Filter by rarity</option>
      <option value="legendary">Legendary</option>
      <option value="epic">Epic</option>
      <option value="mythic">Mythic</option>
    </select>
  )

}

export default RarityFilter;