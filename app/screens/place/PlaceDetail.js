import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import OutlineButton from "../../components/ui/OutlineButton";

export default function PlaceDetail({ route, navigation }) {
  const item = route.params?.item;
  const viewMapHandler = () => {
    navigation.navigate("mapScreen", { viewCoords: item.coordinates });
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: item.imageUri }} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>
          {item.address}
        </Text>
        <Image
          style={[styles.image, styles.mapImage]}
          source={{ uri: item.mapUri }}
        />
        <OutlineButton onPress={viewMapHandler} iconName={"map"}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  detailContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "openSansBold",
    fontSize: 18,
    paddingVertical: 10,
  },
  address: {
    color: "#ffffffea",
    fontFamily: "openSans",
    paddingVertical: 5,
    textAlign: "center",
  },
  mapImage: {
    borderRadius: 6,
    height: 180,
    margin: 10,
  },
});
