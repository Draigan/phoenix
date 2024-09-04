// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import React from 'react';

type Props = {
  input: string;
}

const NormalDisplay: React.FC<Props> = ({ input }) => {
  // const word = useSelector((state: RootState) => state.words).currentWord;
  return (
    <div className='normal-display'>
      {input}
    </div>
  );
}
export default NormalDisplay;

