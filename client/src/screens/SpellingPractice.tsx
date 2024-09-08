import { useEffect, useRef, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import PracticeDisplay from '../components/PracticeDisplay';
import AudioIcon from '../components/AudioIcon';
import NormalDisplay from '../components/NormalDisplay';
import LongPressButton from '../components/LongPressButton';
import usePlaySound from '../hooks/usePlaySound';
import { reset } from '../redux/slices/pointsSlice';

export default function SpellingWord() {

  const [input, setInput] = useState('');
  const maxRound = 3;
  const round = useRef(0);
  const dispatch = useDispatch();

  const points = useSelector((state: RootState) => state.points);
  const settings = useSelector((state: RootState) => state.settings);
  const words = useSelector((state: RootState) => state.words);
  const currentWord = words.currentWord;
  const navigate = useNavigate();
  const { playSound, cleanUpSound } = usePlaySound();


  useEffect(() => {
    if (input === currentWord) {
      setTimeout(() => {
        setInput('');
        round.current = round.current + 1;
        console.log(round.current)
      }, 2000);

    }
  }, [input])

  useEffect(() => {
    if (round.current >= maxRound) {
      navigate('/spellingnormal');
    }

    if (round.current === 0) {
      playSound(words.audio);
    }

    return () => cleanUpSound();

  }, [round.current]);

  // Win condition
  useEffect(() => {
    if (points === settings.pointsToWin) {
      dispatch(reset());
      navigate('/videoplayer');
    }
  }, [points])




  return (
    <div className='spelling-practice'>
      <LongPressButton />
      <Points />
      <AudioIcon />
      <div className='displays'>
        < NormalDisplay input={input} />
        < PracticeDisplay />
      </div>
      <Keyboard input={input} setInput={setInput} mode={'normal'} />
    </div>
  );
}

