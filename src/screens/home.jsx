import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Icon,Button, Text } from "@rneui/themed";
import { stopUserSession } from "../utils/session";
import RNLSpinner from "../components/reactNativeLoadingSpinner";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const goToProfile = () => {
    navigation.navigate("Profile");
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Icon name={"person"} type={"ionicon"} onPress={goToProfile} />
      ),
    });
  }, [navigation]);

  const attempToLogout = () => {
    setIsLoading(true);
    stopUserSession();
    removeUerUid();
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
