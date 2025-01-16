
interface EffectFilterProps {
  setSecondaryEffectText: Function;
}

const EffectFilter: React.FC<EffectFilterProps> = ({setSecondaryEffectText}) => {

  const handleInputChange = (inputContent: string) => {
    setSecondaryEffectText(inputContent);
  }
  
  return (
    <div className="w-full h-full text-center border-2 border-[#cda882]">
      <input type="text" placeholder="Filter by secondary effect" className="w-full h-full text-center bg-gray-900" onChange={(e) => handleInputChange((e.target as HTMLInputElement).value)} />
    </div>
  )

}

export default EffectFilter;