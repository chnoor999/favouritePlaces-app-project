import { ActivityIndicator, StyleSheet, View } from "react-native";
import { memo } from "react";

const LoadingOverlay = ({ backgroundColor, loadingColor, absolute }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        absolute && { position: "absolute", width: "100%", height: "100%" },
      ]}
    >
      <ActivityIndicator size={"large"} color={loadingColor} />
    </View>
  );
};

export default memo(LoadingOverlay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
