import { useState } from 'react'
import Keyboard from '../components/Keyboard'
import Points from '../components/Points';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/slices/pointsSlice';
import { RootState } from '../redux/store';

export default function SpellingNormal() {
  const [input, setInput] = useState('');
  const [currentWord, setCurrentWord] = useState('Cool');

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  console.log(data);

  if (data?.status === 'succeeded') {
    return (
      <div>    <Points />
        NORMAL
        {input}
        <Keyboard input={input} mode={'normal'} setInput={setInput} currentWord={currentWord} />
        <button onClick={() => dispatch(increment())}>Add Point</button>
      </div>
    )
  } else {
    return 'Loading';
  }
}

