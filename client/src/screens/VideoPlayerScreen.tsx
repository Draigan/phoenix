import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { setPointsToWin } from "../redux/slices/settingSlice";

type Props = {
}

const VideoPlayerScreen: React.FC<Props> = ({ }) => {

  const playerRef = useRef<ReactPlayer>(null);
  // const [playing, setPlaying] = useState(true);
  const navigate = useNavigate();
  const embedUrl = useSelector((state: RootState) => state.settings).rewardUrl;



  const dispatch = useDispatch()


  return (
    <div className="videoplayerscreen">
      <button style={{ zIndex: 9999 }} onClick={() => {

        dispatch(setPointsToWin(5))
        navigate('/')

      }}> bail out</button>
      {/* <div className="overlay-top"></div> */}
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
