import { StyleSheet, View, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useState, useRef, useEffect } from "react";

export default function VideosScreen({ navigation, route }) {
  const video = useRef(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("Blur");
      //Every time the screen loses focus the Video is paused
      if (video) video.current.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      console.log("Focus");
      //Every time the screen loses focus the Video is paused
      if (video) video.current.playAsync();
    });

    return subscribe;
  }, [navigation]);
  const [status, setStatus] = useState({});
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Video
        key={item.id}
        ref={video}
        style={styles.video}
        source={
          typeof item.filename === "string"
            ? { uri: item.filename }
            : item.filename
        }
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  video: { flex: 1, width: "100%" },
});
