import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../config/colors/colors";

export default function AppInput({
  isTitleValid,
  title,
  setTitle,
  label,
  ...props
}) {
  const onTitleChange = (txt) => {
    setTitle(txt);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isTitleValid && styles.error]}>{label}</Text>
      <TextInput
        style={styles.input}
        {...props}
        onChangeText={onTitleChange}
        value={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.color1100,
    paddingVertical: 4,
    fontFamily: "openSansSemiBold",
  },
  input: {
    backgroundColor: Colors.color1100,
    color: Colors.color100,
    fontSize: 18,
    padding: 5,
    fontFamily: "openSans",
    borderRadius: 6,
  },
  error: {
    color: "tomato",
  },
});
