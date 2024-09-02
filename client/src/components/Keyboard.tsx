import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
type Props = {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  mode: 'normal' | 'practice';
};
const KeyboardEasy: React.FC<Props> = ({ setInput, input, mode }) => {

  const currentWord = useSelector((state: RootState) => state.words).currentWord;
  const handleDelete = () => {
    setInput((prevValue) => prevValue.slice(0, prevValue.length - 1));
  };

  const handleButtonClick = (letter: string) => {
    // In practice mode we only want to press the next letter
    const expectedLetter = currentWord[input.length];
    if (expectedLetter !== letter && mode === 'practice') return;

    playSound(letter);
    setInput((prevValue) => `${prevValue}${letter}`);
  };

  function playSound(letter: string) {
    return new Audio(`/letters/${letter.toUpperCase()}.wav`).play();
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Practice mode
  if (mode === 'practice') {
    return (
      <div>
        <div className="buttons-container">
          {alphabet.split("").map((letter) => {
            const expectedLetter = currentWord[input.length];
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
      </div>
    );
  }
  if (mode === 'normal') {
    return (
      <div>
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
            className="button"
            key={0}
            onClick={handleDelete}
          >
            DEL
          </div>

        </div>
      </div>
    );
  }
};

export default KeyboardEasy;
