import { Image, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../config/colors/colors";

import LoadingOverlay from "./LoadingOverlay";

const AppImage = ({ isLoading, imageUri, error, fallbackText }) => {
  return (
    <View style={styles.previewContainer}>
      {isLoading ? (
        <LoadingOverlay loadingColor={"#000"} />
      ) : imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={[styles.previewFallback, error && styles.error]}>
          {fallbackText}
        </Text>
      )}
    </View>
  );
};

export default memo(AppImage);

const styles = StyleSheet.create({
  previewContainer: {
    height: hp(22),
    backgroundColor: Colors.color1100,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  previewFallback: {
    color: "#00000094",
    fontFamily: "openSans",
    fontSize: hp(1.65),
  },
  error: {
    color: "tomato",
  },
});
