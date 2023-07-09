import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideosScreen from "../screens/VideosScreen";
import FamilyScreen from "../screens/FamilyScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import NavigatorVideos from "./NavigatorVideos";
import NavigatorFamily from "./NavigatorFamily";
import NavigatorHome from "./NavigatorHome";
import CountingGame from "../screens/CountingGame";
// import { Text } from "react-native";

const Tab = createBottomTabNavigator();
// export default function NavigatorBottom() {
//   return <Text> Nav Bottom</Text>;
// }
export default function NavigatorBottom({
  videosList,
  familyList,
  youtubevids,
}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: "#e8e8e8",
        headerShown: false,
        tabBarStyle: { height: 50 },
      }}
    >
      <Tab.Screen
        name="NavigatorHome"
        initialParams={{ familyList }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={"purple"} size={size} />
          ),
        }}
        component={NavigatorHome}
      />
      <Tab.Screen
        name="NavigatorFamily"
        initialParams={{ familyList }}
        options={{
          tabBarLabel: "Family",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy" color={"purple"} size={size} />
          ),
        }}
        component={NavigatorFamily}
      />
      <Tab.Screen
        name="NavigatorVideos"
        initialParams={{ videosList: videosList, youtubevids: youtubevids }}
        options={{
          tabBarLabel: "Cool Videos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam" color={"crimson"} size={size} />
          ),
        }}
        component={NavigatorVideos}
      />
      <Tab.Screen
        name="NavigatorGames"
        initialParams={{ videosList: videosList }}
        options={{
          headerShown: true,
          title: "Counting Game",
          tabBarLabel: "Games",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-sharp"
              color={"crimson"}
              size={size}
            />
          ),
        }}
        component={CountingGame}
      />
    </Tab.Navigator>
  );
}
