import { useEffect, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import { useNavigate } from 'react-router-dom';
import { useWordSlice } from '../hooks/useWord';
import useStatus from '../hooks/useLoading';
import NormalDisplay from '../components/NormalDisplay';
import AudioIcon from '../components/AudioIcon';
import BackButton from '../components/BackButton';

export default function SpellingNormal() {
  const [input, setInput] = useState('');

  const [round, setRound] = useState(0);
  const [maxRound] = useState(3);

  const currentWord = useSelector((state: RootState) => state.words).currentWord;
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (input === currentWord) {
      setInput('');
      setRound(prev => prev + 1)
    }
  }, [input])

  useEffect(() => {
    if (round >= maxRound) {
      // navigate('/spellingnormal');
    }
  }, [round])

  return (
    <div className='spelling-normal'>
      <Points />
      <BackButton />
      <AudioIcon />
      < NormalDisplay input={input} />
      <Keyboard input={input} setInput={setInput} mode={'normal'} />
    </div>
  )
}
