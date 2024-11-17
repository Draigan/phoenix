import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { spellOutWord } from '../utils/utils';
import { useState } from 'react';
import useSpeech from '../hooks/useSpeech';

const PracticeDisplay = () => {
  const words = useSelector((state: RootState) => state.words)
  const word = words.currentWord;
  const { audioUrl } = useSpeech(word);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [clickable, setClickable] = useState(true);
  function handleOnClick() {
    if (!clickable) return;
    const animationDuration = spellOutWord(word, 1000, audioUrl, setCurrentIndex);
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
