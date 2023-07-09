import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default function VideosScreen({ navigation, route }) {
  const { videosList } = route.params;
  const { youtubevids } = route.params;
  const [sound, setSound] = useState();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/smb_powerup.wav")
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
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={1}
        keyExtractor={(item) => item.id}
        data={videosList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.name, { item: item })}
          >
            <Image
              style={{
                height: item.height,
                width: item.width,
                marginBottom: 20,
              }}
              resizeMode="contain"
              source={item.thumbnail}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
  },
});
