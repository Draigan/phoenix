import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

export default function VideosScreen({ navigation, route }) {
  const { familyList } = route.params;
  console.log(familyList.videos);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={1}
        keyExtractor={(item) => item.id}
        data={familyList.videos}
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
