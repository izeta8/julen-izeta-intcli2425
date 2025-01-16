interface LevelFilterProps {
  inputValue: number;
  setLevelValue: Function;
}

const LevelFilter: React.FC<LevelFilterProps> = ({inputValue, setLevelValue}) => {

  return (
    <div className="w-full h-full text-center border-2 border-[#cda882] flex flex-row flex-wrap justify-center align-center bg-gray-900">
      <p className="flex items-center">Filter by level:</p> 
      <input className="mx-2 w-52" type="range" min="0" max="100" value={inputValue} step="1" onChange={(e) => setLevelValue(e.target.value)}  />
      <p className="flex items-center">{inputValue}</p>
    </div>
  )
}

export default LevelFilter;