import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import IconButton from "./IconButton";

const OutlineButton = ({ children, iconName, onPress, iconStyle }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconButton
        style={iconStyle}
        IoniconsIcon
        name={iconName}
        color={Colors.color1100}
        size={hp(2.4)}
      />
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(OutlineButton);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.color1100,
    paddingVertical: hp(0.2),
    paddingHorizontal: wp(2),
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  label: {
    color: Colors.color1100,
    fontFamily: "openSans",
    fontSize: hp(1.85),
  },
});
