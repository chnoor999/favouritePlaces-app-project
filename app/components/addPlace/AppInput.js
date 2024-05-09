import { StyleSheet, Text, TextInput, View } from "react-native";
import { memo, useCallback } from "react";
import { Colors } from "../../config/colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { debounce } from "lodash";

const AppInput = ({ error, label, setPlacesData, ...props }) => {
  const handleTitleChange = useCallback(
    debounce((txt) => {
      setPlacesData((pre) => {
        return {
          ...pre,
          title: txt,
        };
      });
    }, 500),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, error && styles.error]}>{label}</Text>
      <TextInput
        onChangeText={(txt) => handleTitleChange(txt)}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default memo(AppInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1.8),
  },
  label: {
    fontSize: hp(1.85),
    color: Colors.color1100,
    fontFamily: "openSansSemiBold",
    paddingVertical: hp(1),
  },
  input: {
    backgroundColor: Colors.color1100,
    color: Colors.color100,
    fontSize: hp(2.2),
    fontFamily: "openSans",
    borderRadius: 6,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.6),
  },
  error: {
    color: "tomato",
  },
});
