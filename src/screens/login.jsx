import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import {
  emailPatternRule,
  passMaxLenRule,
  passMinLenRule,
  passPatternRule,
  requiredRule,
} from "../utils/formRules";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../db";
import { customToast, errorToast } from "../utils/toastMessages";
import RNLSpinner from "../components/reactNativeLoadingSpinner";

const Login = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        customToast("Welcome","Welcome on ICar");
        setIsLoading(false);
        navigation.replace("Home");
        // if(response.user.emailVerified === true){

        // }else{
        //   errorToast("Please verify your email '" + response.user.email + "'");
        // }
      })
      .catch((error) => {
        errorToast(error.message);
        setIsLoading(false);
      });
  };

  return (
    <ScrollView>
      {/* view block for Logo */}
      <View style={styles.logoBlock}>
        <Avatar size={"xlarge"} source={require("../../assets/car-icon.png")} />
      </View>

      {/* view block for Form */}
      <View style={styles.formBlock}>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "This is required!" },
            pattern: emailPatternRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={<Icon name="mail" type="ionicon" />}
              errorMessage={errors.email && errors.email.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: requiredRule,
            // minLength: passMinLenRule,
            // maxLength: passMaxLenRule,
            // pattern: passPatternRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
              errorMessage={errors.password && errors.password.message}
            />
          )}
          name="password"
        />

        <Button
          loading={isLoading}
          disabled={isLoading}
          title={"Login"}
          onPress={handleSubmit(onLogin)}
        />
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
      <RNLSpinner isLoading={isLoading}/>
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
