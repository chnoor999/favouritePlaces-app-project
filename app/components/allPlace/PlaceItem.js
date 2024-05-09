import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/colors";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";

const PlaceItem = ({ item }) => {
  const navigation = useNavigation();

  const placeListHandler = () => {
    navigation.navigate("placeDetail", { item });
  };

  return (
    <TouchableOpacity
      onPress={placeListHandler}
      activeOpacity={0.9}
      style={[styles.container]}
    >
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.address}>
          <Entypo name="address" size={hp(1.6)} color="black" />
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PlaceItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color1100,
    height: hp(15),
    borderRadius: 6,
    flexDirection: "row",
    overflow: "hidden",
    marginHorizontal: wp(3),
    marginBottom: hp(2),
  },
  imgContainer: {
    width: wp(40),
  },
  image: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    gap: hp(0.5),
  },
  title: {
    fontFamily: "openSansBold",
    fontSize: hp(1.8),
  },
  address: {
    fontFamily: "openSans",
    fontSize: hp(1.4),
  },
});
