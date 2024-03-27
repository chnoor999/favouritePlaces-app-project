import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { usePlaceContext } from "../../store/place-context";

import IconButton from "../../components/ui/IconButton";
import PlaceList from "../../components/allPlace/PlaceList";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import MessageOverLay from "../../components/ui/MessageOverLay";
import { Colors } from "../../config/colors/colors";

export default function AllPlaces({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { setPlaceFromAsyncStorage, place } = usePlaceContext();

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res = await setPlaceFromAsyncStorage();
      setIsLoading(false);
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name={"add"}
          size={30}
          color={tintColor}
          onPress={() => navigation.navigate("addPlace")}
          IoniconsIcon
        />
      ),
    });
  }, []);

  if (isLoading) {
    return <LoadingOverlay backgroundColor={Colors.color100} />;
  }

  if (place.length <= 0) {
    return <MessageOverLay meesage={"No Place Yet!"} />;
  }

  return <PlaceList data={place} />;
}

const styles = StyleSheet.create({});
