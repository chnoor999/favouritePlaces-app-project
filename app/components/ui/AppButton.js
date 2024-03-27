import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Colors } from "../../config/colors/colors";

export default function AppButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.color1100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 15,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontFamily: "openSansSemiBold",
    color: Colors.color100,
  },
});
