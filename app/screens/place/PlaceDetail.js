import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { memo, useCallback, useLayoutEffect } from "react";
import { usePlaceContext } from "../../store/place-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";

import OutlineButton from "../../components/ui/OutlineButton";
import IconButton from "../../components/ui/IconButton";

const PlaceDetail = ({ route, navigation }) => {
  const { deletePlace } = usePlaceContext();
  const item = route.params?.item;

  const viewMapHandler = useCallback(() => {
    navigation.navigate("mapScreen", { viewCoords: item.pickedLocation });
  }, [item]);

  const handleDelete = useCallback(() => {
    deletePlace(item.id);
    navigation.goBack();
  }, [item.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name={"delete"}
          size={24}
          color={"#fff"}
          MaterialIconsIcon
          onPress={handleDelete}
        />
      ),
    });
  }, []);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>
          <Entypo name="address" size={hp(2)} color="#fff" />
          {item.address}
        </Text>
        <Image
          style={[styles.image, styles.mapImage]}
          source={{ uri: item.mapImage }}
        />
        <OutlineButton onPress={viewMapHandler} iconName={"map"}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default memo(PlaceDetail);

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(32),
  },
  detailContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
  },
  title: {
    color: "#fff",
    fontFamily: "openSansBold",
    fontSize: hp(2.2),
    paddingVertical: 10,
  },
  address: {
    color: "#ffffffea",
    fontFamily: "openSans",
    textAlign: "center",
    fontSize: hp(1.8),
    marginVertical: hp(0.6),
  },
  mapImage: {
    borderRadius: 6,
    marginHorizontal: wp(2),
    marginBottom: hp(0.5),
    width: "100%",
    height: hp(20),
    marginTop: hp(2),
  },
});
