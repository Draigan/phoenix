import { Image, Dimensions, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import audioNumbers from "../data/audionumbers.js";
import { Audio } from "expo-av";

const CountingGame = () => {
  const colors = [
    "blue",
    "green",
    "red",
    "teal",
    "purple",
    "pink",
    "yellow",
    "orange",
  ];
  const randomColor = colors[Math.floor(Math.random() * 8)];

  const [number, setNumber] = useState(0);
  const MAX_NUMBER = 20;

  const [otherSound, setOtherSound] = useState();

  function handleClick() {
    if (number < MAX_NUMBER) {
      setNumber((prevState) => prevState + 1);
    } else {
      setNumber(0);
    }
  }

  // Sounds
  const [sound, setSound] = useState();
  async function playSelectSound(path, delay) {
    setTimeout(async () => {
      const { sound } = await Audio.Sound.createAsync(path);
      setSound(sound);
      await sound.playAsync();
    }, delay);
  }

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audioNumbers[number]);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    if (number === 10) {
      playSelectSound(require("../assets/sounds/10-cookies.mp3"), 500);
    } else if (number === 20) {
      playSelectSound(require("../assets/sounds/elmo.mp3"), 500);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    playSound();
  }, [number]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => handleClick()}>
        <View
          style={{
            height: "100%",
            width: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 200, color: randomColor }}>{number}</Text>
          {number === 5 && (
            <Image
              source={require("../assets/UXimages/fireworks1.gif")}
              style={{ width: 500, height: 300 }}
            />
          )}
          {number === 10 && (
            <Image
              source={require("../assets/UXimages/cookiemonster.gif")}
              style={{ width: 500, height: 300 }}
            />
          )}
          {number === 20 && (
            <Image
              source={require("../assets/UXimages/elmo.gif")}
              style={{ width: 500, height: 300 }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CountingGame;
