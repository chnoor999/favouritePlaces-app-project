import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import { usePlaceContext } from "../../store/place-context";

import OutlineButton from "../../components/ui/OutlineButton";
import IconButton from "../../components/ui/IconButton";

export default function PlaceDetail({ route, navigation }) {
  const item = route.params?.item;
  const viewMapHandler = () => {
    navigation.navigate("mapScreen", { viewCoords: item.coordinates });
  };
  const { deletePlace } = usePlaceContext();

  const handleDelete = useCallback(() => {
    deletePlace(item.id);
    navigation.goBack()
  }, [item.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name={"delete"}
          size={24}
          color={"#fff"}
          MaterialIconsIcon
          onPress={handleDelete}
        />
      ),
    });
  }, [handleDelete]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: item.imageUri }} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>{item.address}</Text>
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
