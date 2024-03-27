import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../config/colors/colors";

export default function LoadingOverlay({ backgroundColor }) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={"large"} color={"#000"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
