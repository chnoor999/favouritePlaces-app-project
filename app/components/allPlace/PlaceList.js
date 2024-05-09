import { FlatList, StyleSheet } from "react-native";
import { memo } from "react";
import { usePlaceContext } from "../../store/place-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import PlaceItem from "./PlaceItem";
import MessageOverLay from "../ui/MessageOverLay";

const PlaceList = () => {
  const { place } = usePlaceContext();

  if (!place.length) {
    return <MessageOverLay message={"No Favourite Place Added Yet!"} />;
  }

  return (
    <FlatList
      data={place}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({ item }) => {
        return <PlaceItem item={item} />;
      }}
    />
  );
};

export default memo(PlaceList);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: hp(1),
  },
});
