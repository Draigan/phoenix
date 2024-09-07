// Plays audio of all the letters And takes a callback
export function spellOutWord(word: string, delay: number, audio: string, callback: any) {
  word.split('').forEach((letter, index) => {
    setTimeout(() => {
      if (callback) {
        callback(index);
      }
      return new Audio(`/letters/${letter.toUpperCase()}.wav`).play();
    }, index * delay);
  });
  const midDuration = word.length * delay;
  const animationAtEndDuration = word.length * 333;
  const finalDuration = midDuration + animationAtEndDuration;

  setTimeout(() => {
    word.split('').forEach((_, index) => {
      _;
      setTimeout(() => {
        if (callback) {
          callback(index);
        }
      }, index * 333);
    });
    new Audio(audio).play();

    if (callback) {
      callback(null);
    }
  }, midDuration);
  setTimeout(() => {
    if (callback) {
      callback(null);
    }
  }, finalDuration);
  return finalDuration;
}
