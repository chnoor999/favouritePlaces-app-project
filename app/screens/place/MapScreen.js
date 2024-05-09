import { Alert, Linking, StyleSheet, View } from "react-native";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Colors } from "../../config/colors/colors";
import MapView, { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SearchMapField from "../../components/addPlace/SearchMapField";
import * as Location from "expo-location";
import IconButton from "../../components/ui/IconButton";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import AddPlace from "./AddPlace";

const MapScreen = ({ navigation, route }) => {
  const takenCoordIfEditMode = route.params?.coords;
  const viewCoords = route.params?.viewCoords;

  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(
    viewCoords
      ? { ...viewCoords }
      : takenCoordIfEditMode
      ? { ...takenCoordIfEditMode }
      : {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 120,
          longitudeDelta: 120,
        }
  );
  const [isLoading, setIsLoading] = useState(false);

  const FormateAddress = (address) => {
    return `${address.name} ${address.street} ${address.district} ${address.city} ${address.region} ${address.country}`;
  };

  // NOTE: This function taken from chatgpt that remove duplicate words and remove null (for address)
  const removeDuplicateWordsAndNull = (text) => {
    let words = text.split(/\s+/);
    let uniqueWords = [...new Set(words)];
    let filteredWords = uniqueWords.filter(
      (word) => word.trim() !== "" && word.toLowerCase() !== "null"
    );
    let result = filteredWords.join(" ");
    return result;
  };

  const SaveLocationHandler = useCallback(async () => {
    // try {
    //   setIsLoading(true);
    //   console.log(coordinates);
    //   const response = await Location.reverseGeocodeAsync({
    //     latitude: coordinates.latitude,
    //     longitude: coordinates.longitude,
    //   });
    //   const formateAddress = FormateAddress(response[0]);
    //   navigation.navigate("addPlace", {
    //     coordinates,
    //     address: removeDuplicateWordsAndNull(formateAddress),
    //   });
    //   setIsLoading(false);
    // } catch (err) {
    //   Alert.alert("Invalid Location", "Please Select Valid Location");
    //   setIsLoading(false);
    // }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Location Access Required",
          "To use the Location feature, please grant permission from your device settings.",
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
        return;
      }
      if (permission.granted) {
        try {
          setIsLoading(true);
          const location = await Location.getCurrentPositionAsync();
          setIsLoading(false);
          setCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          });
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          });
        } catch (err) {
          alert("Fail to Fetch Live Location");
          setIsLoading(false);
        }
      }
    } catch (err) {
      alert("Fail to grant location permission");
    }
  }, []);

  useEffect(() => {
    if (!takenCoordIfEditMode || !viewCoords) {
      getCurrentLocation();
    }
  }, []);

  const mapHandler = useCallback((event) => {
    if (viewCoords) {
      return;
    }
    setCoordinates({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
    mapRef.current.animateToRegion({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  }, []);

  const searchPlacesHandler = useCallback(async (searchQuery) => {
    if (searchQuery) {
      try {
        setIsLoading(true);
        const searchData = await Location.geocodeAsync(searchQuery);
        setIsLoading(false);
        if (searchData.length > 0) {
          setCoordinates({
            latitude: searchData[0].latitude,
            longitude: searchData[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
          mapRef.current.animateToRegion({
            latitude: searchData[0].latitude,
            longitude: searchData[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        } else {
          Alert.alert(
            "Location Not Found",
            "No results found for the given query."
          );
        }
      } catch (err) {
        alert("Error in Search TryAgain Later");
      }
    }
  }, []);

  useLayoutEffect(() => {
    if (viewCoords) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={SaveLocationHandler}
          MaterialIconsIcon
          name={"save"}
          size={26}
          color={"#fff"}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{ ...coordinates }}
        onPress={mapHandler}
      >
        <Marker coordinate={{ ...coordinates }}></Marker>
      </MapView>
      {viewCoords ? null : (
        <>
          <IconButton
            MaterialIconsIcon
            name={"my-location"}
            size={22}
            color={"#fff"}
            style={styles.currentLocationButton}
            onPress={getCurrentLocation}
            underlayColor="#000000a5"
          />
          <SearchMapField searchPlacesHandler={searchPlacesHandler} />
        </>
      )}
      {isLoading && <LoadingOverlay absolute loadingColor={Colors.color100} />}
    </View>
  );
};

export default memo(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  currentLocationButton: {
    position: "absolute",
    backgroundColor: Colors.color100,
    borderRadius: 50,
    padding: hp(1.7),
    bottom: hp(5),
    left: wp(2),
  },
});
