/* 
 * This is a middleman between the word data and the wordSlice.
 * Its purpose is to handle the more complicated logic that would 
 * make our reducers messy. Prepare for data.data.data
 * */

import { useDispatch, useSelector } from 'react-redux';
import { setToWord } from '../redux/slices/wordSlice.tsx';
import { RootState } from '../redux/store.tsx';

export const useWordSlice = () => {
  const dispatch = useDispatch();
  const data: any = useSelector((state: RootState) => state.data);
  const wordsByLength = data.data?.wordsByLength;
  console.log(data, "DATA")
  console.log(wordsByLength, "WORDSBYLENGTH")

  const randomNumber = (max: number) => Math.floor(Math.random() * (max + 1));

  const chngToLength = (length: number) => {
    if (data.status === 'succeeded' && length.toString() in wordsByLength) {
      const wordData = wordsByLength[length.toString()].data;
      const max = randomNumber(wordData.length - 1);
      const item = wordData[max];
      dispatch(setToWord({ currentWord: item.word, audio: item.audio, pictures: item.pictures }));
    }
  };

  return { chngToLength };
};

