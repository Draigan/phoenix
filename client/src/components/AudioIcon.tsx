import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useSpeech from "../hooks/useSpeech";

export default function AudioIcon() {
  const word = useSelector((state: RootState) => state.words);
  const { audioUrl } = useSpeech(word.currentWord);
  function playSound() {
    return new Audio(audioUrl).play();
  }
  return (
    <div className="audio-icon">
      <img src='/images/soundicon.png' onClick={playSound} />
    </div>
  );
}

