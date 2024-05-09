import { Image, StyleSheet, TextInput, View } from "react-native";
import { memo, useCallback, useRef, useState } from "react";
import { Colors } from "../../config/colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { debounce } from "lodash";

import IconButton from "../ui/IconButton";

const SearchMapField = ({ searchPlacesHandler }) => {
  const inpRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = useCallback(
    debounce((txt) => {
      setSearchQuery(txt);
    }, 500),
    []
  );

  const onCrossHandler = useCallback(() => {
    setSearchQuery("");
    inpRef.current.clear();
  }, []);

  const searchBtnHandler = useCallback(() => {
    if (!searchQuery) {
      inpRef.current.focus();
      return;
    }
    searchPlacesHandler(searchQuery);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/locationLogo.png")}
        style={styles.image}
      />
      <TextInput
        ref={inpRef}
        style={styles.input}
        placeholder="Search Places Here"
        onChangeText={(txt) => handleSearchQueryChange(txt)}
      />
      {searchQuery && (
        <IconButton
          name={"circle-with-cross"}
          size={hp(2.5)}
          entypo
          color={"#555454"}
          style={styles.crossBtn}
          underlayColor={"#4646466d"}
          onPress={onCrossHandler}
        />
      )}
      <IconButton
        name={"search"}
        IoniconsIcon
        size={hp(2.8)}
        style={[styles.btn]}
        color={"#fff"}
        onPress={searchBtnHandler}
        underlayColor={"#012a4aad"}
      />
    </View>
  );
};

export default memo(SearchMapField);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: wp(85),
    top: hp(2),
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 50,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { x: 0, y: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  imageContainer: {
    marginHorizontal: wp(2),
  },
  image: {
    width: hp(2.8),
    height: hp(2.8),
    marginLeft: wp(3),
    marginRight: wp(1),
  },
  input: {
    flex: 1,
    fontSize: hp(1.9),
    fontFamily: "openSans",
    paddingVertical: hp(1.4),
  },
  btn: {
    backgroundColor: Colors.color100,
    height: "100%",
    margin: 0,
    paddingHorizontal: wp(3.4),
  },
  crossBtn: {
    padding: 0,
    margin: 0,
    paddingHorizontal: wp(1.5),
    marginRight: wp(0.5),
    height: hp(4.2),
  },
});
