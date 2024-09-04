import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Points() {
  const points = useSelector((state: RootState) => state.points);

  function playAudio(number: number) {
    if (number === 0) {
      return new Audio(`../numbers/en_num_0.mp3`).play();
    }
    if (number < 10) {
      return new Audio(`../numbers/en_num_0${number}.mp3`).play();
    }
    return new Audio(`../numbers/en_num_${number}.mp3`).play();
  }

  function handleClick() {
    playAudio(points);
  }

  return (
    <div className="points" onClick={handleClick}>
      <p>Points: {points}</p>
    </div>
  );
}

