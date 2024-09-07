import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { spellOutWord } from '../utils/utils';
import { useState } from 'react';

const PracticeDisplay = () => {
  const words = useSelector((state: RootState) => state.words)
  const word = words.currentWord;

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [clickable, setClickable] = useState(true);
  function handleOnClick() {
    if (!clickable) return;
    const animationDuration = spellOutWord(word, 1000, words.audio, setCurrentIndex);
    setClickable(false);
    setTimeout(() => {
      setClickable(true);
    }, animationDuration)

  }
  return (
    <button className='practice-display' onClick={handleOnClick}>
      {word.split('').map((letter, index) => (
        <span
          key={index}
          className={index === currentIndex ? 'highlight' : ''}
        >
          {letter}
        </span>
      ))}
    </button>
  );
}
export default PracticeDisplay;
