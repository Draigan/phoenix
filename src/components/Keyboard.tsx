import { Dispatch, SetStateAction } from "react";
type Props = {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  currentWord: string;
  mode: 'normal' | 'practice';
};
const KeyboardEasy: React.FC<Props> = ({ setInput, input, currentWord, mode }) => {

  const handleDelete = () => {
    setInput((prevValue) => prevValue.slice(0, prevValue.length - 1));
  };

  const handleButtonClick = (letter: string) => {
    const expectedLetter = currentWord[input.length]?.toUpperCase();
    playSound(letter);
    if (letter === expectedLetter) {
      setInput((prevValue) => `${prevValue}${letter}`);
    }
  };

  function playSound(letter: string) {
    return new Audio(`/letters/${letter.toUpperCase()}.wav`).play();
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (mode === 'practice') {
    return (
      <div>
        <div className="buttons-container">
          {alphabet.split("").map((letter) => {
            const expectedLetter = currentWord[input.length]?.toUpperCase();
            if (expectedLetter !== undefined && letter === expectedLetter) {
              return (
                <div
                  className="button"
                  style={{ backgroundColor: "green" }}
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
            // const expectedLetter = currentWord[input.length]?.toUpperCase();
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
