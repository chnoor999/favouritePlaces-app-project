import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const MessageOverLay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{message}</Text>
    </View>
  );
};

export default memo(MessageOverLay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "#ffffffab",
    fontFamily: "openSans",
    fontSize: hp(1.7),
  },
});
