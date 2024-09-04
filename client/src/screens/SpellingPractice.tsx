import { useEffect, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useWordSlice } from '../hooks/useWord';
import useLoading from '../hooks/useLoading';
import PracticeDisplay from '../components/PracticeDisplay';
import AudioIcon from '../components/AudioIcon';
import NormalDisplay from '../components/NormalDisplay';

export default function SpellingWord() {
  const [input, setInput] = useState('');

  const [round, setRound] = useState(0);
  const [maxRound] = useState(3);

  const currentWord = useSelector((state: RootState) => state.words).currentWord;
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { chngWord } = useWordSlice();
  const loading = useLoading();

  useEffect(() => {
    chngWord();
  }, [loading])

  useEffect(() => {
    if (input === currentWord) {
      setInput('');
      setRound(prev => prev + 1)
    }
  }, [input])

  useEffect(() => {
    if (round >= maxRound) {
      navigate('/spellingnormal');
    }
  }, [round]);


  return (
    <div className='spelling-practice'>
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

