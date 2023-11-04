import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "@rneui/themed";
import { stopUserSession } from "../utils/session";
import RNLSpinner from "../components/reactNativeLoadingSpinner";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const attempToLogout = () => {
    setIsLoading(true);
    stopUserSession();
    setIsLoading(false);
    navigation.replace("Login");
  };
  return (
    <View>
      <Text h1>Home</Text>
      <Button title={"Test"} />
      <Button title={"Logout"} onPress={attempToLogout} />
      <RNLSpinner isLoading={isLoading} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({});
