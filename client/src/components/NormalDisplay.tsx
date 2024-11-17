import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React, { useEffect, useRef } from 'react';

type Props = {
  input: string;
}
const NormalDisplay: React.FC<Props> = ({ input }) => {
  const flash = useRef<HTMLDivElement | null>(null);
  const word = useSelector((state: RootState) => state.words).currentWord;

  useEffect(() => {
    if (word) {

      if (input.length === word.length && input !== word) {
        flash.current?.classList.add('flashing-red');
      } else {
        flash.current?.classList.remove('flashing-red');
      }

      if (input.length === word.length && input === word) {
        flash.current?.classList.add('flashing-green');
      } else {
        flash.current?.classList.remove('flashing-green');
      }

    }

  }, [input, word])

  return (
    <div ref={flash} className='normal-display'>
      {input}
    </div>
  );
}
export default NormalDisplay;

