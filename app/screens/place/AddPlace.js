import { Alert, StyleSheet, View } from "react-native";
import { memo, useCallback, useState } from "react";
import { usePlaceContext } from "../../store/place-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AppInput from "../../components/addPlace/AppInput";
import AppImagePicker from "../../components/addPlace/AppImagePicker";
import LocationPicker from "../../components/addPlace/LocationPicker";
import AppButton from "../../components/ui/AppButton";

const AddPlace = ({ navigation }) => {
  const [placesData, setPlacesData] = useState({
    title: "",
    image: "",
    pickedLocation: "",
    mapImage: "",
    address: "",
  });

  // validation state
  const [errors, setErrors] = useState({
    titleValid: false,
    imageValid: false,
    MapUriValid: false,
  });

  const { addPlace } = usePlaceContext();

  const addPlaceHandler = useCallback(() => {
    const validTitle = placesData.title.trim().length;
    if (
      !validTitle ||
      !placesData.image.length ||
      !placesData.mapImage.length
    ) {
      setErrors({
        titleValid: !validTitle,
        imageValid: !placesData.image,
        MapUriValid: !placesData.mapImage,
      });
      Alert.alert("Invalid Credentials", "Enter right Credentials");
      return;
    } else {
      addPlace({ ...placesData });
      navigation.goBack();
    }
  }, [placesData]);

  return (
    <View style={styles.formContainer}>
      <AppInput
        label={"Title"}
        titleValue={placesData.title}
        setPlacesData={setPlacesData}
        error={errors.titleValid}
      />
      <AppImagePicker
        imageUri={placesData.image}
        setPlacesData={setPlacesData}
        error={errors.imageValid}
      />
      <LocationPicker
        setPlacesData={setPlacesData}
        mapImageUri={placesData.mapImage}
        pickedLocationCoords={placesData.pickedLocation}
        error={errors.MapUriValid}
      />

      <AppButton onPress={addPlaceHandler}>Add Place</AppButton>
    </View>
  );
};

export default memo(AddPlace);

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
});
