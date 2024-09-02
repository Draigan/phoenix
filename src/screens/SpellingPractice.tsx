import { useEffect, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/slices/pointsSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useWordSlice } from '../hooks/useWordSlice';

export default function SpellingPractice() {
  const [input, setInput] = useState('');
  const [currentWord, setCurrentWord] = useState('cool');

  const [round, setRound] = useState(0);
  const [maxRound, setMaxRound] = useState(3);

  const wordData = useSelector((state: RootState) => state.words);
  const data = useSelector((state: RootState) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chngToLength } = useWordSlice();

  useEffect(() => {
    chngToLength(3);
  }, [])

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


  if (data?.status === 'succeeded') {
    return (
      <div>    <Points />
        wordData: {wordData.currentWord}
        {input}
        <Keyboard input={input} setInput={setInput} currentWord={currentWord} mode={'practice'} />
        <button onClick={() => dispatch(increment())}>Add Point</button>
        <button onClick={() => setRound(prev => prev + 1)}>Set Round</button>
      </div>
    )
  } else {
    return 'Loading';
  }
}

