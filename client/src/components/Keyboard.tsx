import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  mode: 'normal' | 'practice';
};

const KeyboardEasy: React.FC<Props> = ({ setInput, input, mode }) => {

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const preloadedAudios = useRef<HTMLAudioElement[]>([]);
  const word = useSelector((state: RootState) => state.words).currentWord;
  const handleDelete = () => {
    setInput((prevValue) => prevValue.slice(0, prevValue.length - 1));
  };

  const handleButtonClick = (letter: string, index: number) => {
    if (word.length === input.length) return;
    const expectedLetter = word[input.length];
    if (expectedLetter !== letter && mode === 'practice') return;
    setInput((prevValue) => `${prevValue}${letter}`);
    if (index < 26){
      preloadedAudios.current[index].play();
    }
  };

  function preloadAudio(url: string) {
    const audio = new Audio(url);
    audio.preload = 'auto';
    return audio;
  }

  useEffect(() => {
    alphabet.split('').forEach(letter => {
      const audio = preloadAudio(`/letters/${letter.toUpperCase()}.wav`)
      preloadedAudios.current.push(audio);
    });

  }, [])


  if (mode === 'normal') {
    return (
      <div className="buttons-container">
        {alphabet.split("").map((letter, index) => {
          return (
            <div
              className="button"
              key={letter}
              onClick={() => handleButtonClick(letter, index)}
            >
              {letter}
            </div>
          );
        }
        )}
        <div
          className="button-delete"
          key={0}
          onClick={handleDelete}
        >
          DEL
        </div>
        <div
          className="button-delete"
          key={0}
          onClick={() => handleButtonClick("'", 88)}
        >
          '
        </div>

      </div>
    );
  }
};

export default KeyboardEasy;
