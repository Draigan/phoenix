import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Props = {
}

const VideoPlayerScreen: React.FC<Props> = ({ }) => {

  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(true);
  const navigate = useNavigate();
  const embedUrl = useSelector((state: RootState) => state.settings).rewardUrl;

  function pause() {
    setPlaying(prev => !prev);
  }

  //<div className="videoplayerscreen-overlay" onTouchEnd={pause} onClick={pause}></div>
  return (
    <div className="videoplayerscreen">
      <button onTouchEnd={pause} onClick={pause}>test</button>
      <ReactPlayer
        url={embedUrl}
        className='react-player'
        width='100%'
        height='100%'
        playing={true}
        muted={playing}
        ref={playerRef}
        onEnded={() => navigate('/')}
      />
    </div>
  )

}
export default VideoPlayerScreen;
