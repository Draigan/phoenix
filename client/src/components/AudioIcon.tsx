import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function AudioIcon() {
  const word = useSelector((state: RootState) => state.words);
  function playSound() {
    return new Audio(word.audio).play();
  }
  return (
    <div className="audio-icon">
      <img src='/images/soundicon.png' onClick={playSound} />
    </div>
  );
}

