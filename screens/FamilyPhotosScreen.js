import { View, FlatList, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";

const FamilyPhotosScreen = ({ navigation, route }) => {
  const { familyList } = route.params;

  return (
    <FlatList
      numColumns={1}
      data={familyList.photos}
      renderItem={({ item }) => {
        return (
          <>
            <Text>
              {item.width}
              ....
              {item.height}
              ...
              {item.name}
            </Text>
            <Image
              style={{
                width: item.width,
                height: item.height,
              }}
              source={item.path}
            />
          </>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
  },
});

export default FamilyPhotosScreen;
