import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <IconButton
      onPress={handleBack}
      IoniconsIcon
      name={"arrow-back-sharp"}
      size={22}
      color={"#fff"}
      style={styles.btn}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 0,
    marginRight: 15,
    padding: 10,
    marginLeft:-8
  },
});
