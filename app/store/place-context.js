import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useContext, useEffect, useState } from "react";

const placeContext = createContext({
  place: [],
  addPlace: () => {},
  setPlaceFromAsyncStorage: () => {},
});

export const PlaceContextprovider = ({ children }) => {
  const [place, setPlace] = useState([]);

  const addPlace = (placeObj) => {
    setPlace((pre) => [{ id: Math.random(), ...placeObj }, ...pre]);
  };

  const setPlaceFromAsyncStorage = async () => {
    const res = await AsyncStorage.getItem("place");
    if (res) {
      setPlace(JSON.parse(res));
    }
    return res
  };

  useEffect(() => {
    AsyncStorage.setItem("place", JSON.stringify(place));
  }, [place]);

  const value = {
    place,
    addPlace,
    setPlaceFromAsyncStorage,
  };

  return (
    <placeContext.Provider value={value}>{children}</placeContext.Provider>
  );
};

export const usePlaceContext = () => {
  return useContext(placeContext);
};
