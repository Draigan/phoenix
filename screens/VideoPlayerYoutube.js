import {
  StyleSheet,
  Button,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";
import { useState, useRef, useCallback, useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideosScreen({ navigation, route }) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  // is video Playing?
  const [playing, setPlaying] = useState(true);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  // pause on exit screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("Blur");
      setPlaying(false);
    });

    return unsubscribe;
  }, [navigation]);

  // play on focus screen
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      console.log("Focus");
      setPlaying(true);
    });

    return subscribe;
  }, [navigation]);
  const [status, setStatus] = useState({});
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "85%",
          height: "100%",
          zIndex: 100,
          backgroundColor: "transparent",
        }}
      ></View>
      <View style={{ transform: [{ rotate: "90deg" }] }}>
        <YoutubePlayer
          height={SCREEN_WIDTH}
          // video width -> screen height
          width={SCREEN_HEIGHT - 130}
          // prevent aspect ratio auto sizing
          play={playing}
          videoId={item.uri}
          onChangeState={onStateChange}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            playing ? setPlaying(false) : setPlaying(true);
          }}
        >
          <View
            style={{
              width: 100,
              height: 50,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 1,
              right: 50,
            }}
          >
            <Text variant="headlineMedium">
              {!playing && "Play"}
              {playing && "Pause"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
    //   transform: [{ rotate: "90deg" }],
  },
  video: { flex: 1, width: "100%" },
});
