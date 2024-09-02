import { useEffect, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/slices/pointsSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useWordSlice } from '../hooks/useWordSlice';
import useStatus from '../hooks/useStatus';

export default function SpellingPractice() {
  const [input, setInput] = useState('');

  const [round, setRound] = useState(0);
  const [maxRound] = useState(3);

  const currentWord = useSelector((state: RootState) => state.words).currentWord;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const { chngToLength } = useWordSlice();
  const { loading } = useStatus();

  useEffect(() => {
    chngToLength(settings.maxLetters);
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
  }, [round])


  if (loading === false) {
    return (
      <div>    <Points />
        wordData: {currentWord}
        {input}
        <Keyboard input={input} setInput={setInput} mode={'practice'} />
        <button onClick={() => dispatch(increment())}>Add Point</button>
        <button onClick={() => setRound(prev => prev + 1)}>Set Round</button>
      </div>
    )
  } else {
    return 'Loading';
  }
}

