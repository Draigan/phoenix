import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Points() {
  // let points = localStorage.getItem('points');
  const points = useSelector((state: RootState) => state.points);
  return (
    <div>
      <p>Points: {points}</p>
    </div>
  );
}

