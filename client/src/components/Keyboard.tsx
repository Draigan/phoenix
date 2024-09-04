import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
type Props = {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  mode: 'normal' | 'practice';
};

const KeyboardEasy: React.FC<Props> = ({ setInput, input, mode }) => {

  const word = useSelector((state: RootState) => state.words).currentWord;
  const handleDelete = () => {
    setInput((prevValue) => prevValue.slice(0, prevValue.length - 1));
  };

  function playSound(letter: string) {
    return new Audio(`/letters/${letter.toUpperCase()}.wav`).play();
  }

  const handleButtonClick = (letter: string) => {
    if (word.length === input.length) return;
    // In practice mode we only want to press the next letter
    const expectedLetter = word[input.length];
    if (expectedLetter !== letter && mode === 'practice') return;
    playSound(letter);
    setInput((prevValue) => `${prevValue}${letter}`);
  };


  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Word mode
  if (mode === 'practice') {
    return (
      <div className="buttons-container">
        {alphabet.split("").map((letter) => {
          const expectedLetter = word[input.length];
          if (expectedLetter !== undefined && letter === expectedLetter) {
            return (
              <div
                className="button"
                style={{ backgroundColor: "#003747" }}
                key={letter}
                onClick={() => handleButtonClick(letter)}
              >
                {letter}
              </div>
            );
          } else {
            return (
              <div
                className="button"
                key={letter}
                onClick={() => handleButtonClick(letter)}
              >
                {letter}
              </div>
            );
          }
        })}
        <div
          className="button"
          key={0}
          onClick={handleDelete}
        >
          DEL
        </div>

      </div>
    );
  }
  if (mode === 'normal') {
    return (
      <div className="buttons-container">
        {alphabet.split("").map((letter) => {
          return (
            <div
              className="button"
              key={letter}
              onClick={() => handleButtonClick(letter)}
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

      </div>
    );
  }
};

export default KeyboardEasy;
