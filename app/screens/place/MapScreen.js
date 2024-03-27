import { Alert, Linking, StyleSheet, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Colors } from "../../config/colors/colors";
import MapView, { Marker } from "react-native-maps";

import SearchMapFelid from "../../components/addPlace/SearchMapFelid";
import * as Location from "expo-location";
import IconButton from "../../components/ui/IconButton";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

export default function MapScreen({ navigation, route }) {
  const takenCoordIfEditMode = route.params?.coords;
  const viewCoords = route.params?.viewCoords;

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
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const FormateAddress = (address) => {
    return `${address.name} ${address.street} ${address.district} ${address.city} ${address.region} ${address.country}`;
  };

  // NOTE: This funtion taken from chatgpt that remove dublicate words and remove null (for address)
  function removeDuplicateWordsAndNull(text) {
    let words = text.split(/\s+/);
    let uniqueWords = [...new Set(words)];
    let filteredWords = uniqueWords.filter(
      (word) => word.trim() !== "" && word.toLowerCase() !== "null"
    );
    let result = filteredWords.join(" ");
    return result;
  }

  const SaveLocationHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await Location.reverseGeocodeAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
      const formatedAddress = FormateAddress(response[0]);
      navigation.navigate("addPlace", {
        coordinates,
        address: removeDuplicateWordsAndNull(formatedAddress),
      });
      setIsLoading(false);
    } catch (err) {
      alert("Please Select Valid Location");
      setIsLoading(false);
    }
  }, [coordinates]);

  const getCurrentLocation = async () => {
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
  };

  useEffect(() => {
    if (viewCoords) {
      return;
    }
    if (!takenCoordIfEditMode) {
      getCurrentLocation();
    }
  }, []);

  const mapHandler = (event) => {
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
  };

  const searchMapHandler = async () => {
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
        alert("Error in Search TryAgian Later");
      }
    }
  };

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
          style={styles.saveBtn}
        />
      ),
    });
  }, [SaveLocationHandler]);

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
            style={styles.currentLocatonbutton}
            onPress={getCurrentLocation}
            underlayColor="#000000a5"
          />
          <SearchMapFelid
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchMapHandler={searchMapHandler}
          />
        </>
      )}
      {isLoading && <LoadingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  currentLocatonbutton: {
    position: "absolute",
    bottom: 50,
    left: 10,
    backgroundColor: Colors.color100,
    borderRadius: 50,
    padding: 15,
  },
  saveBtn: { padding: 10, margin: 0 },
});
