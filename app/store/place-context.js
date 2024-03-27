import { createContext, useContext, useState } from "react";

const placeContext = createContext({
  place: [],
  addPlace: () => {},
});

export const PlaceContextprovider = ({ children }) => {
  const [place, setPlace] = useState([]);

  const addPlace = (placeObj) => {
    setPlace((pre) => [{ id: Math.random(), ...placeObj }, ...pre]);
  };

  const value = {
    place,
    addPlace,
  };

  return (
    <placeContext.Provider value={value}>{children}</placeContext.Provider>
  );
};

export const usePlaceContext = () => {
  return useContext(placeContext);
};
