import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Props = {
}

const VideoPlayerScreen: React.FC<Props> = ({ }) => {

  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();
  const embedUrl = useSelector((state: RootState) => state.settings).rewardUrl;

  function pause() {
    setPlaying(prev => !prev);
  }

  return (
    <div className="videoplayerscreen">
      <div className="videoplayerscreen-overlay" onClick={pause}></div>
      <ReactPlayer
        url={embedUrl}
        className='react-player'
        width='100%'
        height='100%'
        playing={playing}
        muted={false}
        ref={playerRef}
        onEnded={() => navigate('/')}
      />
    </div>
  )

}
export default VideoPlayerScreen;
