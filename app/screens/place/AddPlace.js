import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import AppInput from "../../components/addPlace/AppInput";
import AppImagePicker from "../../components/addPlace/ImagePicker";
import LocationPicker from "../../components/addPlace/LocationPicker";
import AppButton from "../../components/ui/AppButton";

export default function AddPlace() {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [mapUri, setMapUri] = useState("");

  const addPlaceHandler = () => {
    const validTitle = title.trim().length
    
    if (
      !validTitle ||
      !imageUri.length ||
      !coordinates.latitude ||
      !mapUri.length
    ) {
      Alert.alert("Invalid Cradentials", "Enter right Cradential");
      return;
    } else {
      console.log("ok!");
    }
    
  };

  return (
    <View style={styles.formContainer}>
      <AppInput label={"Title"} title={title} setTitle={setTitle} />
      <AppImagePicker imageUri={imageUri} setImageUri={setImageUri} />
      <LocationPicker
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        mapUri={mapUri}
        setMapUri={setMapUri}
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
