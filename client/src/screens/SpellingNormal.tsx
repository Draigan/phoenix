import { useEffect, useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useWordSlice from '../hooks/useWord';
import NormalDisplay from '../components/NormalDisplay';
import AudioIcon from '../components/AudioIcon';
import BackButton from '../components/BackButton';
import { increment } from '../redux/slices/pointsSlice';

export default function SpellingNormal() {
  const [input, setInput] = useState('');


  const currentWord = useSelector((state: RootState) => state.words).currentWord;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chngWord } = useWordSlice();

  useEffect(() => {
    if (input === currentWord) {
      setTimeout(() => {
        setInput('');
        dispatch(increment());
        chngWord();
        navigate('/')
      }, 2000)

    }
  }, [input])


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
