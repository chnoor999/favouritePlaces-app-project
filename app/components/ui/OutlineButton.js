import { StyleSheet, Text, TouchableOpacity } from "react-native";

import IconButton from "./IconButton";
import { Colors } from "../../config/colors/colors";

export default function OutlineButton({ children, iconName, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <IconButton IoniconsIcon name={iconName} color={Colors.color1100} size={18} />
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.color1100,
    marginVertical: 10,
    paddingHorizontal:10,
    marginBottom:15
  },
  label: {
    color: Colors.color1100,
    fontFamily: "openSans",
    fontSize: 16,
  },
});
