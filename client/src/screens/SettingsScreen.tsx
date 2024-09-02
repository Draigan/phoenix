import Slider from "../components/Slider";

export default function SettingsScreen() {

  function handleChangeMaxWordLength() {

  }

  return (
    <Slider max={5} min={1} step={1} initialValue={1} onChange={handleChangeMaxWordLength} />
  )
}

