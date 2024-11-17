/* 
 * This is a service between the word data and the wordSlice.
 * Its purpose is to handle the more complicated logic that would 
 * make our reducers messy. Prepare for data.data.data - Im sorry
 * */

import { useDispatch, useSelector } from 'react-redux';
import { setToWord } from '../redux/slices/wordSlice.tsx';
import { RootState } from '../redux/store.tsx';

export const useWordSlice = () => {
  const dispatch = useDispatch();
  const data: any = useSelector((state: RootState) => state.data);
  const settings: any = useSelector((state: RootState) => state.settings);
  const wordsByLength = data.data?.wordsByLength;

  const randomNumber = (max: number) => Math.floor(Math.random() * (max + 1));

  // Change to a word based on the current settings
  function chngWord() {
    if (data.status !== 'succeeded') return;
    if (settings.wordCategory === 'wordsByLength' && settings.maxLetters.toString() in wordsByLength) {
      const wordData = wordsByLength[settings.maxLetters.toString()].data;
      const max = randomNumber(wordData.length - 1);
      const item = wordData[max];
      dispatch(setToWord({ currentWord: item.word, audio: item.audio, pictures: item.pictures }));
    } else {
      const catData = data.data[settings.wordCategory].data;
      const randIndex = randomNumber(catData.length - 1);
      console.log("catData", catData);
      const item = catData[randIndex];
      dispatch(setToWord({ currentWord: item.word, audio: item.audio, pictures: item.pictures }));
    }
  }

  return { chngWord };
};

export default useWordSlice;
