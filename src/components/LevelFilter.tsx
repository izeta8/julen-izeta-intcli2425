
import { Slider } from "@nextui-org/slider";

// interface LevelFilterProps {

// }

// const LevelFilter: React.FC<LevelFilterProps> = () => {

const LevelFilter = () => {
  return (
    <Slider
      className="max-w-md"
      defaultValue={0.4}
      label="Temperature"
      maxValue={1}
      minValue={0}
      step={0.01}
    />
  );
}

export default LevelFilter;