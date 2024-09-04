import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import { setMaxLetters, setWordCategory } from "../redux/slices/settingSlice";
import { RootState } from "../redux/store";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const data = useSelector((state: RootState) => state.data).data;
  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {
    const newCategories: string[] = Object.keys(data).map(key => String(key));
    setCategories(newCategories);
  }, [data]);

  function handleChangeMaxWordLength(e: number) {
    dispatch(setMaxLetters({ maxLetters: e }));
  }

  function handleWordCatChange(e: string) {
    dispatch(setWordCategory({ 'wordCategory': e }))
  }

  return (
    <div>
      <Link to="/">BACK</Link>

      <Dropdown value={settings.wordCategory} label={'Word Category'} options={categories} onChange={handleWordCatChange} />
      {settings.wordCategory === 'wordsByLength' &&
        (<Slider max={7} min={2} step={1} initialValue={settings.maxLetters} onChange={handleChangeMaxWordLength} />)}
    </div>
  )
}

