import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { Colors } from "../../config/colors/colors";

import AllPlaces from "../place/AllPlaces";
import AddPlace from "../place/AddPlace";
import MapScreen from "../place/MapScreen";
import PlaceDetail from "../place/PlaceDetail";
import BackButton from "../../components/ui/BackButton";

export default function PlacesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade_from_bottom",
        headerStyle: { backgroundColor: Colors.color100 },
        contentStyle: { backgroundColor: Colors.color100 },
        headerTitleStyle: { fontFamily: "openSansBold" },
        headerTintColor: "#fff",
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen
        name="allPlace"
        component={AllPlaces}
        options={{ title: "Your Favourite Places", headerLeft: () => {} }}
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
      <Stack.Screen
        name="placeDetail"
        component={PlaceDetail}
        options={{ title: "Place Detail" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
