import { StyleSheet, TouchableHighlight } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function IconButton({
  IoniconsIcon,
  MaterialIconsIcon,
  name,
  size,
  color,
  onPress,
  style,
  underlayColor = "#ffffff13",
}) {
  return (
    <TouchableHighlight
      style={[styles.iconContainer, style]}
      onPress={onPress}
      underlayColor={underlayColor}
    >
      <>
        {IoniconsIcon && <Ionicons name={name} color={color} size={size} />}
        {MaterialIconsIcon && (
          <MaterialIcons name={name} color={color} size={size} />
        )}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    borderRadius: 50,
    margin: 4,
    alignItems:"center",
    justifyContent:"center"
  },
});
