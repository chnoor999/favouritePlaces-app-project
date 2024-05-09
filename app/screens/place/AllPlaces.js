import { memo, useEffect, useLayoutEffect, useState } from "react";
import { usePlaceContext } from "../../store/place-context";

import IconButton from "../../components/ui/IconButton";
import PlaceList from "../../components/allPlace/PlaceList";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllPlaces = ({ navigation }) => {
  const { setPlace } = usePlaceContext();

  const [isLoading, setIsLoading] = useState(true);

  const getPlaceFromAsyncStorage = async () => {
    setIsLoading(true);
    const res = await AsyncStorage.getItem("place");
    setIsLoading(false);
    if (res) {
      setPlace(JSON.parse(res));
    }
  };

  useEffect(() => {
    getPlaceFromAsyncStorage();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name={"add"}
          size={28}
          color={tintColor}
          onPress={() => navigation.navigate("addPlace")}
          IoniconsIcon
        />
      ),
    });
  }, []);

  if (isLoading) {
    return <LoadingOverlay loadingColor={"#fff"} />;
  }

  return <PlaceList />;
};

export default memo(AllPlaces);
