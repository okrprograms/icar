import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';

const Register = () => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConPass, setHideConPass] = useState(true);

  const updateHidePass = () => {
    setHidePass(!hidePass);
  };
  const updateHideConPass = () => {
    setHideConPass(!hideConPass);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onRegister = (data) => {
    Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'This is some something 👋'
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={<Icon name="person" type="ionicon" />}
              errorMessage={errors.firstName && errors.firstName.message}
            />
          )}
          name="firstName"
        />
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "This is required!" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={<Icon name="person" type="ionicon" />}
              errorMessage={errors.lastName && errors.lastName.message}
            />
          )}
          name="lastName"
        />
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "This is required!" },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter value is not the email format!",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
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
            required: { value: true, message: "This is required!" },
            minLength: { value: 6, message: "Minimum 6 characters!" },
            maxLength: { value: 20, message: "Maximum 20 characters!" },
            pattern: {
              value:
                /(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!*_])[^<>'" \n\t]{8,}$/,
              message:
                "Please enter at least one capital case character, one number and one special character!",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
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
              maxLength={25}
              secureTextEntry={hidePass}
              errorMessage={errors.password && errors.password.message}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "This is required!" },
            minLength: { value: 6, message: "Minimum 6 characters!" },
            maxLength: { value: 20, message: "Maximum 20 characters!" },
            pattern: {
              value:
                /(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!*_])[^<>'" \n\t]{8,}$/,
              message:
                "Please enter at least one capital case character, one number and one special character!",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={<Icon name="lock-closed" type="ionicon" />}
              rightIcon={
                <Icon
                  name={hidePass ? "eye" : "eye-off"}
                  type="ionicon"
                  onPress={() => {
                    setHideConPass(!hidePass);
                  }}
                />
              }
              maxLength={25}
              secureTextEntry={hidePass}
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
          name="confirmPassword"
        />

        <Button title={"Register"} onPress={handleSubmit(onRegister)} />
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
