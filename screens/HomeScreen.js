import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState, useCallback, useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import globalStyles from "../styles/global";
import useFindDimensions from "../hooks/useFindAspectRatio";
import { Audio } from "expo-av";

const HomeScreen = ({ navigation }) => {
  const [sound, setSound] = useState();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/LOZ_Secret.wav")
    );
    setSound(sound);

    console.log("Playing Sound");
    //await sound.playAsync();
  }
  useEffect(() => {
    const fartsy = navigation.addListener("focus", () => {
      console.log("focus");
      //Every time the screen loses focus the Video is paused
      playSound();
    });

    return fartsy;
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingHorizontal: 5,
        }}
      >
        <Image
          style={{ width: "100%" }}
          source={require("../assets/youtubevids/halloween.jpg")}
          resizeMode="contain"
        />
        {/* Logo */}
        <Image
          style={{ width: "100%" }}
          resizeMode="contain"
          source={require("../assets/UXimages/logo.png")}
        />
        {/* Family Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigatorFamily");
          }}
        >
          <View
            style={{ borderWidth: 2, borderColor: "black", marginBottom: 20 }}
          >
            <Image
              style={{ width: "100%" }}
              resizeMode="contain"
              source={require("../assets/UXimages/family.png")}
            />
          </View>
        </TouchableOpacity>
        {/* Videos Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigatorVideos");
          }}
        >
          <View style={{ borderWidth: 2, borderColor: "black" }}>
            <Image
              style={{ width: "100%" }}
              resizeMode="contain"
              source={require("../assets/UXimages/videos.png")}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
