import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React from 'react';
import ImageGrid from '../components/ImageGrid';

type Props = {
  size: number;
}

const WordImageScreen: React.FC<Props> = ({ size }) => {
  const word = useSelector((state: RootState) => state.words);
  return (
    <>
      <ImageGrid size={4} />
      {word}
    </>
  );
}

export default WordImageScreen;

