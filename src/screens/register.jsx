import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";

const Register = () => {

    const[hidePass, setHidePass] = useState(true);
    const[hideConPass, setHideConPass] = useState(true);

    const updateHidePass = () =>{
        setHidePass(!hidePass);
    }
    const updateHideConPass = () =>{
        setHideConPass(!hideConPass);
    }
  return (
    <ScrollView>
      {/* view block for Logo */}
      <View style={styles.logoBlock}>
        <Avatar size={"xlarge"} source={require("../../assets/car-icon.png")} />
      </View>

      {/* view block for Form */}
      <View style={styles.formBlock}>
        <Input
          placeholder="First Name"
          // keyboardType="numeric"
          leftIcon={<Icon name="person" type="ionicon" />}
        />
        <Input
          placeholder="Last Name"
          leftIcon={<Icon name="person" type="ionicon" />}
        />
        <Input
          placeholder="Email"
          leftIcon={<Icon name="mail" type="ionicon" />}
        />
        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock-closed" type="ionicon" />}
          rightIcon={<Icon name={hidePass ? "eye" : "eye-off"} type="ionicon"   onPress={() =>{setHidePass(!hidePass)}}/>}
          secureTextEntry={hidePass}
        />
        <Input
          placeholder="Confirm Password"
          leftIcon={<Icon name="lock-closed" type="ionicon" />}
          rightIcon={<Icon name={hideConPass ? "eye" : "eye-off"} type="ionicon"  onPress={() =>{setHideConPass(!hideConPass)}}/>}
          secureTextEntry={hideConPass}
          
        />

        <Button title={"Register"} />
      </View>

      {/* view block for Footer */}
      <View style={styles.footerBlock}></View>
    </ScrollView>
  );
};

export default Register;

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
