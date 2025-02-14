import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRewardUrl } from "../redux/slices/settingSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const VideoChooserScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoLinks = [
    "https://www.youtube.com/watch?v=ly1OUsQ0zN4",
    "https://www.youtube.com/watch?v=qOfrV66OpDM",
    "https://www.youtube.com/watch?v=4kRSDTpN18w&t=2s",
    "https://www.youtube.com/watch?v=dOz0Es9kNgw&t=2s",
    "https://www.youtube.com/watch?v=2ZTpEkQD1Fw&t=40s",
    "https://www.youtube.com/watch?v=IPr_Ay-7aT0",
    "https://www.youtube.com/watch?v=KHyhJQ5yXsI",
    "https://www.youtube.com/watch?v=1tbj6cksyA8&t=669s",
  ];

  function handleClick(link: string) {
    dispatch(setRewardUrl({ rewardUrl: link }));
    navigate("/videoplayer");
  }

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div style={styles.container}>
      <Carousel responsive={responsive} containerClass="carousel-container">
        {videoLinks.map((link, index) => {
          const urlID = link.split("v=")[1]?.substring(0, 11);
          const thumbnailUrl = `https://img.youtube.com/vi/${urlID}/hqdefault.jpg`;

          return (
            <div key={index} style={styles.thumbnailWrapper} onClick={() => handleClick(link)}>
              <img src={thumbnailUrl} alt="video thumbnail" style={styles.thumbnail} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default VideoChooserScreen;

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Optional: Black background for better contrast
  },
  thumbnailWrapper: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  thumbnail: {
    width: "100%", // Make images scale with the screen
    maxWidth: "300px", // Keep a max width for better readability
    height: "auto",
    borderRadius: "10px",
    transition: "transform 0.2s ease-in-out",
  },
};

