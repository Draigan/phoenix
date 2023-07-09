import { createStackNavigator } from "@react-navigation/stack";
import VideosScreen from "../screens/VideosScreen";
import VideoPlayer from "../screens/VideoPlayer";
import FamilyScreen from "../screens/FamilyScreen";
import FamilyPhotosScreen from "../screens/FamilyPhotosScreen";
import FamilyVideosScreen from "../screens/FamilyVideosScreen";

const Stack = createStackNavigator();

export default function NavigatorFamily({ navigation, route }) {
  const { familyList } = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: "#e8e8e8",
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Family"
        initialParams={{ familyList }}
        component={FamilyScreen}
      />
      <Stack.Screen
        name="FamilyPhotos"
        initialParams={{ familyList }}
        component={FamilyPhotosScreen}
      />
      <Stack.Screen
        name="FamilyVideos"
        initialParams={{ familyList }}
        component={FamilyVideosScreen}
      />
      {familyList.videos.map((item) => {
        return (
          <Stack.Screen
            key={item.id}
            name={item.name}
            component={VideoPlayer}
          />
        );
      })}
    </Stack.Navigator>
  );
}
