import { StyleSheet, TouchableHighlight } from "react-native";
import { memo } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const IconButton = ({
  IoniconsIcon,
  MaterialIconsIcon,
  name,
  size,
  color,
  onPress,
  style,
  entypo,
  underlayColor = "#ffffff13",
}) => {
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
        {entypo && <Entypo name={name} color={color} size={size} />}
      </>
    </TouchableHighlight>
  );
};

export default memo(IconButton);

const styles = StyleSheet.create({
  iconContainer: {
    padding: 6,
    borderRadius: 50,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
