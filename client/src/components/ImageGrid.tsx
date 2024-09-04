import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React from 'react';

type Props = {
  size: number;
}

const ImageGrid: React.FC<Props> = ({ size }) => {
  const word = useSelector((state: RootState) => state.words);
  return (
    <div className='image-grid'>
      {word.pictures.map((item: string, index: number) => {
        if (index < size) {
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

export default ImageGrid;

