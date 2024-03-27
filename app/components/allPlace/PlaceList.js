import { FlatList, StyleSheet } from "react-native";
import React from "react";

import ListItem from "./ListItem";

export default function PlaceList({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <ListItem
            title={item.title}
            imageUri={item.imageUri}
            address={item.address}
            item={item}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
