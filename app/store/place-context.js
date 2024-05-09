import { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const placeContext = createContext({
  place: [],
  setPlace: () => {},
  addPlace: () => {},
  deletePlace: () => {},
});

export const PlaceContextProvider = ({ children }) => {
  const [place, setPlace] = useState([]);

  const addPlace = (placeObj) => {
    setPlace((pre) => [{ id: Math.random(), ...placeObj }, ...pre]);
  };

  const deletePlace = (id) => {
    setPlace((pre) => {
      return pre.filter((item) => item.id != id);
    });
  };

  useEffect(() => {
    AsyncStorage.setItem("place", JSON.stringify(place));
  }, [place]);

  const value = {
    place,
    setPlace,
    addPlace,
    deletePlace,
  };

  return (
    <placeContext.Provider value={value}>{children}</placeContext.Provider>
  );
};

export const usePlaceContext = () => {
  return useContext(placeContext);
};
