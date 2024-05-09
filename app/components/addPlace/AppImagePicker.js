import { Alert, Linking, StyleSheet, View } from "react-native";
import { memo, useCallback, useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import * as ImagePicker from "expo-image-picker";
import OutlineButton from "../ui/OutlineButton";
import AppImage from "../ui/AppImage";

const AppImagePicker = ({ imageUri, setPlacesData, error }) => {
  const [isLoading, setIsLoading] = useState(false);

  const takeImageFromCamera = useCallback(async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Camera Permission Required",
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
        setIsLoading(false);
        if (image.assets) {
          setPlacesData((pre) => {
            return {
              ...pre,
              image: image?.assets[0]?.uri,
            };
          });
        }
      } catch (err) {
        setIsLoading(false);
        alert("You Have Not Taken The Image From Camera");
      }
    }
  }, []);

  const pickImageFromMedia = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Media Permission Required",
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
        setIsLoading(false);
        if (image.assets) {
          setPlacesData((pre) => {
            return {
              ...pre,
              image: image?.assets[0]?.uri,
            };
          });
        }
      } catch (err) {
        setIsLoading(false);
        alert("You Have Not Picked The Image From Media");
      }
    }
  }, []);

  return (
    <View>
      <AppImage
        fallbackText={"No Image Taken Yet!"}
        isLoading={isLoading}
        error={error}
        imageUri={imageUri}
      />

      <View style={styles.btnsContainer}>
        <View style={styles.btn}>
          <OutlineButton iconName={"camera"} onPress={takeImageFromCamera}>
            Take Image
          </OutlineButton>
        </View>
        <View style={styles.btn}>
          <OutlineButton iconName={"image"} onPress={pickImageFromMedia}>
            Upload Image
          </OutlineButton>
        </View>
      </View>
    </View>
  );
};

export default memo(AppImagePicker);

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp(6),
  },
  btn: {
    flex: 1,
  },
});
