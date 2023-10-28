import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text } from "@rneui/themed";

export default function Home() {
  return (
    <View>
      <Text h1>Home</Text>
      <Button>Test</Button>
      <Button>Test 2</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
