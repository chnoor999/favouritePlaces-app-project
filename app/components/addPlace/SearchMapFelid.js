import {
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useRef} from "react";

import { Colors } from "../../config/colors/colors";
import IconButton from "../ui/IconButton";

export default function SearchMapFelid({
  searchQuery,
  setSearchQuery,
  searchMapHandler,
}) {
  const fieldRef = useRef(null);

  const searchbtnsHandler = () => {
    fieldRef.current.focus();
    searchMapHandler();
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldBox}>
        <Image
          source={require("../../assets/images/locationLogo.png")}
          style={styles.image}
        />
        <TextInput
          ref={fieldRef}
          style={styles.input}
          placeholder="Search here"
          value={searchQuery}
          onChangeText={(txt) => setSearchQuery(txt)}
        />
        <IconButton
          name={"search"}
          IoniconsIcon
          size={24}
          style={[styles.btn]}
          color={"#fff"}
          onPress={searchbtnsHandler}
          underlayColor={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldBox: {
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 50,
  },
  image: {
    width: 25,
    height: 25,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  input: {
    fontSize: 16,
    width: "73%",
    paddingVertical: 10,
    fontFamily: "openSans",
  },
  btn: {
    backgroundColor: Colors.color100,
    margin: 0,
    flex: 1,
  },
  crossBtn: {
    borderWidth: 1,
    borderColor: Colors.color100,
    backgroundColor: "#fff",
    margin: 0,
    flex: 1,
  },
});
