import { ScrollView, Image, TouchableOpacity } from "react-native";
import useFindDimensions from "../hooks/useFindAspectRatio";

export default function FamilyScreen({ navigation, route }) {
  const { familyList } = route.params;
  const imageFamily = require("../assets/UXimages/family.png");
  const imagePhotos = require("../assets/UXimages/photos.png");
  const imageVideos = require("../assets/UXimages/familyvideos.png");
  const [familyWidth, familyHeight] = useFindDimensions(imageFamily);
  const [photosWidth, photosHeight] = useFindDimensions(imagePhotos);
  const [videosWidth, videosHeight] = useFindDimensions(imageVideos);
  return (
    <ScrollView>
      <Image
        style={{
          height: familyHeight,
          width: familyWidth,
          marginBottom: 20,
        }}
        resizeMode="contain"
        source={imageFamily}
      />
      <TouchableOpacity onPress={() => navigation.navigate("FamilyPhotos")}>
        <Image
          style={{
            height: photosHeight,
            width: photosWidth,
            marginBottom: 20,
          }}
          resizeMode="contain"
          source={imagePhotos}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("FamilyVideos")}>
        <Image
          style={{
            height: videosHeight,
            width: videosWidth,
            marginBottom: 20,
          }}
          resizeMode="contain"
          source={imageVideos}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
