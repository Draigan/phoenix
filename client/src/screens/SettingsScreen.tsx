
import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import { setMaxLetters, setPointsToWin, setRewardUrl, setWordCategory } from "../redux/slices/settingSlice";
import { RootState } from "../redux/store";
import Dropdown from "../components/Dropdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWordSlice from "../hooks/useWord";
import { reset } from "../redux/slices/pointsSlice";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const data = useSelector((state: RootState) => state.data).data;
  const [categories, setCategories] = useState<string[]>([]);
  const [changeWord, setChangeWord] = useState(false);
  const { chngWord } = useWordSlice();
  const [rewardValue, setRewardValue] = useState('https://www.youtube.com/watch?v=hIJnxhI_mMc');
  const [pointsToWinValue, setPointsToWinValue] = useState(settings.pointsToWin);

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

  function handleRewardVideo(e: React.ChangeEvent<HTMLInputElement>) {
    setRewardValue(e.target.value);
    dispatch(setRewardUrl({ rewardUrl: rewardValue }));
  }

  function handleResetPoints() {
    dispatch(reset());
  }
  function handlePointsToWin(e: React.ChangeEvent<HTMLInputElement>) {
    //Remove leading zeros
    let value: number = Number(e.target.value.replace(/^0+(?!$)/, ''));
    setPointsToWinValue(value);
    dispatch(setPointsToWin(value));
  }
  return (
    <div>
      <Link onClick={handleBackClick} to="/">BACK</Link>
      <Dropdown value={settings.wordCategory} label={'Word Category'} options={categories} onChange={handleWordCatChange} />
      {settings.wordCategory === 'wordsByLength' &&
        (<Slider max={7} min={2} step={1} initialValue={settings.maxLetters} onChange={handleChangeMaxWordLength} />)}
      <br />
      <button onClick={handleResetPoints}>Reset Points</button>
      <br />
      Points Needed:
      <input pattern="[0-9]*"
        inputMode="numeric" type="number" value={pointsToWinValue} onChange={handlePointsToWin} />
      <br />
      <br />
      Set reward video:
      <input type="text" value={rewardValue} onChange={handleRewardVideo} />
    </div>
  )
}

