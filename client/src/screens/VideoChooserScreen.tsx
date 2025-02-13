import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRewardUrl } from "../redux/slices/settingSlice";

type Props = {
}

const VideoChooserScreen: React.FC<Props> = ({ }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoLinks = ["https://www.youtube.com/watch?v=ly1OUsQ0zN4",
    "https://www.youtube.com/watch?v=4kRSDTpN18w&t=2s",
    "https://www.youtube.com/watch?v=dOz0Es9kNgw&t=2s",
    "https://www.youtube.com/watch?v=2ZTpEkQD1Fw&t=40s", 
    "https://www.youtube.com/watch?v=IPr_Ay-7aT0",
    "https://www.youtube.com/watch?v=KHyhJQ5yXsI",
    "https://www.youtube.com/watch?v=1tbj6cksyA8&t=669s"
];

  function handleClick(link: string) {
      dispatch(setRewardUrl({ rewardUrl: link }));
      navigate('/videoplayer');
    }
return (
    <div>
      {videoLinks.map((link: string, index: number) => {
        const urlID = link.split("v=")[1]?.substring(0, 11);
        const thumbnailUrl = `https://img.youtube.com/vi/${urlID}/hqdefault.jpg`;

        return (
          <div key={index} onClick={() => handleClick(link)}>
            <img src={thumbnailUrl} alt="video thumbnail" />
          </div>
        );
      })}
    </div>
  );


}
export default VideoChooserScreen;
