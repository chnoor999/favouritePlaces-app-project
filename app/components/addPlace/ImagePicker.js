import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { Colors } from "../../config/colors/colors";

import * as ImagePicker from "expo-image-picker";
import LoadingOverlay from "../ui/LoadingOverlay";
import OutlineButton from "../ui/OutlineButton";

export default function AppImagePicker({
  imageUri,
  setImageUri,
  isImageUriValid,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const takeImageHandler = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Camera Access Required",
        "To use the camera feature, please grant permission from your device settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }

    if (permission.granted) {
      setIsLoading(true);
      try {
        const image = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
          aspect: [16, 7],
        });
        setImageUri(image.assets[0].uri);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert("Fail to Take the Image");
      }
    }
  };

  const uploadImageHandler = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Media Access Required",
        "To access the Media feature, please grant permission from your device settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }

    if (permission.granted) {
      setIsLoading(true);
      try {
        const image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          aspect: [14, 7],
        });
        setImageUri(image.assets[0].uri);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert("Fail to Upload the Image");
      }
    }
  };

  return (
    <View>
      <View style={styles.previewContainer}>
        {isLoading ? (
          <LoadingOverlay />
        ) : imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text
            style={[styles.previewFallback, isImageUriValid && styles.error]}
          >
            No Image Taken Yet!
          </Text>
        )}
      </View>
      <View style={styles.btnsContainer}>
        <View style={styles.btn}>
          <OutlineButton iconName={"camera"} onPress={takeImageHandler}>
            Take Image
          </OutlineButton>
        </View>
        <View style={styles.btn}>
          <OutlineButton iconName={"image"} onPress={uploadImageHandler}>
            Upload Image
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
    overflow: "hidden",
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
  error: {
    color: "tomato",
  },
});
