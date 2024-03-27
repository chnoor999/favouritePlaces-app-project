import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Colors } from "../../config/colors/colors";
import { useNavigation } from "@react-navigation/native";

export default function ListItem({ imageUri, title, address, item, lastList }) {
  const navigation = useNavigation();

  const placeListHandler = () => {
    navigation.navigate("placeDetail", { item });
  };

  return (
    <TouchableOpacity
      onPress={placeListHandler}
      activeOpacity={0.9}
      style={[styles.container, { marginBottom: lastList && 50 }]}
    >
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
      <View style={styles.detialContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.address}>
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.color1100,
    flex: 1,
    height: 120,
    borderRadius: 6,
    flexDirection: "row",
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 25,
  },
  imgContainer: {
    flex: 1.4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detialContainer: {
    flex: 2.1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontFamily: "openSansBold",
    marginVertical: 6,
  },
  address: {
    fontFamily: "openSans",
  },
});
