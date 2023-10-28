import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";

const Login = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  return (
    <ScrollView>
      {/* view block for Logo */}
      <View style={styles.logoBlock}>
        <Avatar size={"xlarge"} source={require("../../assets/car-icon.png")} />
      </View>

      {/* view block for Form */}
      <View style={styles.formBlock}>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="mail" type="ionicon" />}
        />
        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock-closed" type="ionicon" />}
          rightIcon={
            <Icon
              name={hidePass ? "eye" : "eye-off"}
              type="ionicon"
              onPress={() => {
                setHidePass(!hidePass);
              }}
            />
          }
          secureTextEntry={hidePass}
        />

        <Button title={"Login"} />
      </View>

      {/* view block for Footer */}
      <View style={styles.footerBlock}>
        <Button
          type="clear"
          title={"Make a New Account?"}
          titleStyle={{ textDecorationLine: "underline" }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formBlock: {
    flex: 1,
  },
  footerBlock: {
    flex: 1,
  },
});
