import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Colors } from "./app/config/colors/colors";
import { PlaceContextprovider } from "./app/store/place-context";

import PlacesStack from "./app/screens/navigation/PlacesStack";

export default function App() {
  const [fontLoaded] = useFonts({
    openSans: require("./app/config/fonts/OpenSans-Regular.ttf"),
    openSansSemiBold: require("./app/config/fonts/OpenSans-SemiBold.ttf"),
    openSansBold: require("./app/config/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.color100} />
      <PlaceContextprovider>
        <NavigationContainer>
          <PlacesStack />
        </NavigationContainer>
      </PlaceContextprovider>
    </>
  );
}
