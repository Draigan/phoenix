import { useState, useEffect } from "react";
import NavigatorBottom from "./navigators/NavigatorBottom";
import { Appearance, LogBox, Text } from "react-native";
import useFindDimensions from "./hooks/useFindAspectRatio";
import familyPhotos from "./data/familyphotos";
import coolVideos from "./data/coolvideos";
import familyVideos from "./data/familyvideos";
import youtubevids from "./data/youtubevids.js";

const Main = () => {
  const colorScheme = Appearance.getColorScheme();
  console.log(colorScheme);
  const familyPhotosWithDimensions = familyPhotos.map((item) => {
    let [width, height] = useFindDimensions(item);
    return {
      path: item,
      width: width,
      height: height,
    };
  });
  const [familyList, setFamilyList] = useState({
    videos: familyVideos,
    photos: familyPhotosWithDimensions,
  });

  const [videosList, setVideosList] = useState(coolVideos);

  // Find and add dimensions to videos list
  videosList.forEach((item) => {
    let [width, height] = useFindDimensions(item.thumbnail);
    item.width = width;
    item.height = height;
  });

  familyList.videos.forEach((item) => {
    let [width, height] = useFindDimensions(item.thumbnail);
    item.width = width;
    item.height = height;
  });

  youtubevids.forEach((item) => {
    let [width, height] = useFindDimensions(item.thumbnail);
    item.width = width;
    item.height = height;
  });

  // There is a bug with useNativeDriver. This is the current solution *Rolls Eyes*
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <NavigatorBottom
      familyList={familyList}
      youtubevids={youtubevids}
      videosList={videosList}
    />
  );
};
export default Main;
