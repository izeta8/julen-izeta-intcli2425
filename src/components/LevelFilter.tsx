interface LevelFilterProps {
  inputValue: number;
  setLevelValue: Function;
}

const LevelFilter: React.FC<LevelFilterProps> = ({inputValue, setLevelValue}) => {

  return (
    <>
      <input type="range" min="0" max="100" value={inputValue} step="1" onChange={(e) => setLevelValue(e.target.value)}  />
      <p>{inputValue}</p>
    </>
  )
}

export default LevelFilter;