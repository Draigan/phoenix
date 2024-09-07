import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import usePlaySound from '../hooks/usePlaySound';

export default function Points() {
  const points = useSelector((state: RootState) => state.points);
  const { playSound } = usePlaySound();

  function getAudioUrl(number: number): string {
    if (number === 0) {
      return `../numbers/en_num_0.mp3`;
    }
    if (number < 10) {
      return `../numbers/en_num_0${number}.mp3`;
    }
    return `../numbers/en_num_${number}.mp3`;
  }

  function handleClick() {
    playSound(getAudioUrl(points));
  }

  return (
    <div className="points" onClick={handleClick}>
      <p>Points: {points}</p>
    </div>
  );
}

