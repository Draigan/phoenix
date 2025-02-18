import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import { setMaxLetters, setWordCategory } from "../redux/slices/settingSlice";
import { RootState } from "../redux/store";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWordSlice from "../hooks/useWord";

export default function NathanSettings() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const data = useSelector((state: RootState) => state.data).data;
  const [categories, setCategories] = useState<string[]>([]);
  const [changeWord, setChangeWord] = useState(false);
  const { chngWord } = useWordSlice();


  useEffect(() => {
    localStorage.setItem("nathansettings", "false");
  }, [])

  useEffect(() => {
    const newCategories: string[] = Object.keys(data).map(key => String(key));
    setCategories(newCategories);
  }, [data]);

  function handleChangeMaxWordLength(e: number) {
    dispatch(setMaxLetters({ maxLetters: e }));
    setChangeWord(true);
  }

  function handleBackClick() {
    if (changeWord) {
      chngWord();
    }
  }

  function handleWordCatChange(e: string) {
    dispatch(setWordCategory({ 'wordCategory': e }))
    setChangeWord(true);
  }
  return (
    <div>
      <Link onClick={handleBackClick} to="/">BACK</Link>
      <Dropdown
        value={settings.wordCategory}
        label="Word Category"
        options={categories}
        onChange={handleWordCatChange}
      />
      {settings.wordCategory === "wordsByLength" && (
        <Slider
          max={15}
          min={1}
          step={1}
          initialValue={settings.maxLetters}
          onChange={handleChangeMaxWordLength}
        />
      )}

    </div>
  );
}
