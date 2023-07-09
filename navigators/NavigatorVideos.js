import { createStackNavigator } from "@react-navigation/stack";
import VideosScreen from "../screens/VideosScreen";
import VideosScreenYoutube from "../screens/VideosScreenYoutube.js";
import VideoPlayerYoutube from "../screens/VideoPlayerYoutube.js";
import VideoPlayer from "../screens/VideoPlayer";

const Stack = createStackNavigator();

export default function NavigatorVideos({ navigation, route }) {
  const { videosList } = route.params;
  const { youtubevids } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerStyle: {} }}>
      <Stack.Screen
        name="Videos"
        initialParams={{ videosList: videosList, youtubevids: youtubevids }}
        component={VideosScreenYoutube}
      />
      {videosList.map((item) => {
        return (
          <Stack.Screen
            key={item.id}
            name={item.name}
            component={VideoPlayer}
          />
        );
      })}
      {youtubevids.map((item) => {
        return (
          <Stack.Screen
            key={item.id}
            name={item.name}
            component={VideoPlayerYoutube}
          />
        );
      })}
    </Stack.Navigator>
  );
}
