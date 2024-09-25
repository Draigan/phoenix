import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Props = {
}

const VideoPlayerScreen: React.FC<Props> = ({ }) => {

  const playerRef = useRef<ReactPlayer>(null);
  const navigate = useNavigate();
  const embedUrl = useSelector((state: RootState) => state.settings).rewardUrl;

  return (
    <div className="videoplayerscreen">
      <div className="overlay-top"></div>
      <div className="overlay-bottom"></div>
      <div className="overlay-right"></div>
      <div className="overlay-left"></div>
      <ReactPlayer
        url={embedUrl}
        className='react-player'
        width='100%'
        height='100%'
        playing={false}
        muted={false}
        ref={playerRef}
        onEnded={() => navigate('/')}
      />
    </div>
  )

}
export default VideoPlayerScreen;
