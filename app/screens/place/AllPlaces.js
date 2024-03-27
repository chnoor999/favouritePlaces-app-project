import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import IconButton from "../../components/ui/IconButton";

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

  return (
    <View>
      <Text>AllPlaces</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
