import { useEffect, useRef, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import PracticeDisplay from '../components/PracticeDisplay';
import AudioIcon from '../components/AudioIcon';
import NormalDisplay from '../components/NormalDisplay';
import LongPressButton from '../components/LongPressButton';

export default function SpellingWord() {
  const [input, setInput] = useState('');

  const [maxRound] = useState(6);
  const round = useRef(0)

  const currentWord = useSelector((state: RootState) => state.words).currentWord;
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (input === currentWord) {
      setInput('');
      round.current = round.current + 1;
      console.log(round.current)
    }
  }, [input])

  useEffect(() => {
    if (round.current >= maxRound) {
      navigate('/spellingnormal');
    }
  }, [round.current]);


  return (
    <div className='spelling-practice'>
      <LongPressButton />
      <Points />
      <AudioIcon />
      <div className='displays'>
        < NormalDisplay input={input} />
        < PracticeDisplay />
      </div>
      <Keyboard input={input} setInput={setInput} mode={'practice'} />
    </div>
  );
}

