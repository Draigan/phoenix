import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function ImageGrid() {
  const word = useSelector((state: RootState) => state.words);
  return (
    <div className='image-grid'>
      {word.pictures.map((item: string, index: number) => {
        if (index < 4) {
          return (
            <div key={index} className='image-item'>
              <img src={item} />
            </div>
          )
        }
      })}
    </div>
  );
}

