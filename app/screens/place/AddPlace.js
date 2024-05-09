import { Alert, StyleSheet, View } from "react-native";
import { memo, useCallback, useRef, useState } from "react";
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
  const titleInpRef = useRef();
  const [placesData, setPlacesData] = useState({
    title: "",
    image: "",
    pickedLocation: "",
    mapImage: "",
    address: "",
  });

  // validation state
  const [validation, setValidation] = useState({
    titleValid: false,
    imageValid: false,
    MapUriValid: false,
  });

  const { addPlace } = usePlaceContext();

  const addPlaceHandler = useCallback(() => {
    // const validTitle = title.trim().length;
    // if (
    //   !validTitle ||
    //   !imageUri.length ||
    //   !coordinates.latitude ||
    //   !mapUri.length
    // ) {
    //   setValidation({
    //     titleValid: !validTitle,
    //     imageValid: !imageUri,
    //     MapUriValid: !mapUri,
    //   });
    //   Alert.alert("Invalid Credentials", "Enter right Credentials");
    //   return;
    // } else {
    //   addPlace({
    //     title,
    //     imageUri,
    //     coordinates,
    //     mapUri,
    //     address,
    //   });
    //   navigation.goBack();
    // }
  }, []);

  return (
    <View style={styles.formContainer}>
      <AppInput
        label={"Title"}
        titleValue={placesData.title}
        setPlacesData={setPlacesData}
        // error={}
      />
      <AppImagePicker
        imageUri={placesData.image}
        setPlacesData={setPlacesData}
        // error={}
      />
      <LocationPicker
        setPlacesData={setPlacesData}
        mapImageUri={placesData.mapImage}
        // error={}
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
