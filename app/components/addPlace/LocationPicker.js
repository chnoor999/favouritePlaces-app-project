import { View } from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getMapImage } from "../../util/googleMap";

import OutlineButton from "../ui/OutlineButton";
import AppImage from "../ui/AppImage";

const LocationPicker = ({ setPlacesData, error, mapImageUri }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const coords = route.params?.coordinates;
  const address = route.params?.address;

  const [isLoading, setIsLoading] = useState(false);

  const pickOnMapHandler = useCallback(async () => {
    navigation.navigate("mapScreen", coords && { coords });
  }, [coords]);

  const getMapImageHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getMapImage({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      setPlacesData((pre) => {
        return {
          ...pre,
          mapImage: response,
        };
      });
      setIsLoading(false);
    } catch (err) {
      alert("Error try again later or Check your Internet Connection");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (coords && address) {
      setPlacesData((pre) => {
        return {
          ...pre,
          pickedLocation: coords,
          address: address,
        };
      });
      getMapImageHandler();
    }
  }, [coords, address]);

  return (
    <View>
      <AppImage
        fallbackText={"No Location Picked Yet!"}
        isLoading={isLoading}
        error={error}
        imageUri={mapImageUri}
      />

      <OutlineButton iconName={"map"} onPress={pickOnMapHandler}>
        Pick on Map
      </OutlineButton>
    </View>
  );
};

export default memo(LocationPicker);
