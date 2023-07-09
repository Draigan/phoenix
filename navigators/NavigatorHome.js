import { createStackNavigator } from "@react-navigation/stack";
import VideosScreen from "../screens/VideosScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function NavigatorHome({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Something" component={VideosScreen} />
    </Stack.Navigator>
  );
}
