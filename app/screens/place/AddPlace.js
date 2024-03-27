import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { usePlaceContext } from "../../store/place-context";

import AppInput from "../../components/addPlace/AppInput";
import AppImagePicker from "../../components/addPlace/ImagePicker";
import LocationPicker from "../../components/addPlace/LocationPicker";
import AppButton from "../../components/ui/AppButton";

export default function AddPlace({ navigation }) {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [mapUri, setMapUri] = useState("");
  const [address, setAddress] = useState("");

  // validation state
  const [validation, setValition] = useState({
    titleValid: false,
    imageValid: false,
    MapUriValid: false,
  });

  const { addPlace } = usePlaceContext();

  const addPlaceHandler = () => {
    const validTitle = title.trim().length;

    if (
      !validTitle ||
      !imageUri.length ||
      !coordinates.latitude ||
      !mapUri.length
    ) {
      setValition({
        titleValid: !validTitle,
        imageValid: !imageUri,
        MapUriValid: !mapUri,
      });
      Alert.alert("Invalid Cradentials", "Enter right Cradential");
      return;
    } else {
      addPlace({
        title,
        imageUri,
        coordinates,
        mapUri,
        address,
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.formContainer}>
      <AppInput
        isTitleValid={validation.titleValid}
        label={"Title"}
        title={title}
        setTitle={setTitle}
      />
      <AppImagePicker
        isImageUriValid={validation.imageValid}
        imageUri={imageUri}
        setImageUri={setImageUri}
      />
      <LocationPicker
        setAddress={setAddress}
        setCoordinates={setCoordinates}
        mapUri={mapUri}
        setMapUri={setMapUri}
        isLocationValid={validation.MapUriValid}
      />

      <AppButton onPress={addPlaceHandler}>Add Place</AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 18,
  },
});
