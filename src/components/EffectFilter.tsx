
interface EffectFilterProps {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setSecondaryEffectText: Function;
}

const EffectFilter: React.FC<EffectFilterProps> = ({setSecondaryEffectText}) => {

  const handleInputChange = (inputContent: string) => {
    setSecondaryEffectText(inputContent);
  }
  
  return (
    <input type="text" placeholder="Filter by secondary effect" className="p-2 w-52" onChange={(e) => handleInputChange((e.target as HTMLInputElement).value)} />
  )

}

export default EffectFilter;