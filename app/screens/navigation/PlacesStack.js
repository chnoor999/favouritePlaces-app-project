import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { Colors } from "../../config/colors/colors";

import AllPlaces from "../place/AllPlaces";
import AddPlace from "../place/AddPlace";
import MapScreen from "../place/MapScreen";

export default function PlacesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade_from_bottom",
        headerStyle: { backgroundColor: Colors.color100 },
        contentStyle: { backgroundColor: Colors.color100 },
        headerTitleStyle: { fontFamily: "openSansBold" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="allPlace"
        component={AllPlaces}
        options={{ title: "Your Favourite Places" }}
      />
      <Stack.Screen
        name="addPlace"
        component={AddPlace}
        options={{ title: "Add New Place" }}
      />
      <Stack.Screen
        name="mapScreen"
        component={MapScreen}
        options={{ title: "Map" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
