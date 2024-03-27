import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { usePlaceContext } from "../../store/place-context";

import IconButton from "../../components/ui/IconButton";
import PlaceList from "../../components/allPlace/PlaceList";

export default function AllPlaces({ navigation }) {
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

  const { place } = usePlaceContext();

  return <PlaceList data={place} />;
}

const styles = StyleSheet.create({});
