import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import { setMaxLetters } from "../redux/slices/settingSlice";
import { RootState } from "../redux/store";
import Dropdown from "../components/Dropdown";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  function handleChangeMaxWordLength(e: number) {
    dispatch(setMaxLetters({ maxLetters: e }));
  }

  function handleWordCatChange(e: string) {
    console.log(e)
  }

  return (
    <div>
      <Dropdown label={'Word Category'} options={['colours', 'animals']} onChange={handleWordCatChange} />
      <Slider max={5} min={1} step={1} initialValue={settings.maxLetters} onChange={handleChangeMaxWordLength} />
    </div>
  )
}

