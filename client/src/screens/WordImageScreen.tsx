import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React from 'react';

type Props = {
};

const WordImageScreen: React.FC<Props> = ({ }) => {
  const word = useSelector((state: RootState) => state.words);

  return (
    <>
      {word}
    </>
  );
}

export default WordImageScreen;


