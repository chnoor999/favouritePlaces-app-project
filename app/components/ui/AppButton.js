import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../config/colors/colors";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const AppButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(AppButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.color1100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: hp(1.4),
    marginVertical: hp(1.2),
  },
  text: {
    fontSize: hp(1.8),
    fontFamily: "openSansSemiBold",
    color: Colors.color100,
  },
});
