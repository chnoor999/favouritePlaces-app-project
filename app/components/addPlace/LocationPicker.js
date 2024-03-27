import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Colors } from "../../config/colors/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getMapImage } from "../../util/googleMap";

import OutlineButton from "../ui/OutlineButton";
import LoadingOverlay from "../ui/LoadingOverlay";

export default function LocationPicker({
  setCoordinates,
  setMapUri,
  mapUri,
}) {
  const route = useRoute();
  const navigation = useNavigation();

  const coords = route.params?.coordinates;

  const [isLoading, setisLoading] = useState(false);

  const pickOnMapHandler = async () => {
    setisLoading(true);
    navigation.navigate("mapScreen", coords && { coords });
    setisLoading(false);
  };

  const getMapImageHandler = async () => {
    setisLoading(true);
    const response = await getMapImage({
      lat: coords.latitude,
      lng: coords.longitude,
    });
    setMapUri(response);
    setisLoading(false);
  };

  useEffect(() => {
    if (coords) {
      setCoordinates(coords);
      getMapImageHandler();
    }
  }, [coords]);

  return (
    <View>
      <View style={styles.previewContainer}>
        {isLoading ? (
          <LoadingOverlay />
        ) : mapUri ? (
          <Image source={{ uri: mapUri }} style={styles.image} />
        ) : (
          <Text style={styles.previewFallback}>No Location Picked Yet!</Text>
        )}
      </View>

      <View style={styles.btnsContainer}>
        <View style={styles.btn}>
          <OutlineButton iconName={"map"} onPress={pickOnMapHandler}>
            Pick on Map
          </OutlineButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    height: 180,
    backgroundColor: Colors.color1100,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  previewFallback: {
    color: "#00000094",
    fontFamily: "openSans",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  btn: {
    flex: 1,
  },
});
