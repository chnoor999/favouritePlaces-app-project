import { FlatList, StyleSheet } from "react-native";
import React from "react";

import ListItem from "./ListItem";

export default function PlaceList({ data }) {
  const dataLength = data.length;

  return (
    <FlatList
      data={data}
      renderItem={({ item ,index}) => {
        return (
          <ListItem
            title={item.title}
            imageUri={item.imageUri}
            address={item.address}
            item={item}
            lastList={index === dataLength-1}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
