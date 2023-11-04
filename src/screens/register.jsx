import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../db";

import {
  requiredRule,
  emailPatternRule,
  passMinLenRule,
  passMaxLenRule,
  passPatternRule,
} from "../utils/formRules";
import { errorToast, successToast } from "../utils/toastMessages";
import RNLSpinner from "../components/reactNativeLoadingSpinner";

const Register = () => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConPass, setHideConPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");

  //   const validateConfirmPass = (value) => {
  // console.log(value);
  // console.log(password);
  // if (value !== password) {
  //   setError("confirmPassword", {
  //     type: "custom",
  //     message: "Passwords must match!",
  //   });
  // }
  // else {
  //   clearErrors("confirmPassword");
  // }

  //   };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const onRegister = (data) => {
    setIsLoading(true);
    if (data.confirmPassword !== data.password) {
      errorToast("Password does not match!");
    } else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          successToast("User registered Successfully!");
          setIsLoading(false);
        })
        .catch((error) => {
          errorToast(error.message);
          setIsLoading(false);
        });
    }
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
            required: requiredRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
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
            required: requiredRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
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
            required: requiredRule,
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
            minLength: passMinLenRule,
            maxLength: passMaxLenRule,
            pattern: passPatternRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
              placeholder="Password"
              onBlur={onBlur}
              //   onChangeText={onChange}
              onChangeText={(value) => {
                onChange(value);
                // setPassword(value);
              }}
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
            required: requiredRule,
            minLength: passMinLenRule,
            maxLength: passMaxLenRule,
            pattern: passPatternRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
              placeholder="Confirm Password"
              onBlur={onBlur}
              //   onChangeText={onChange}
              onChangeText={(value) => {
                onChange(value);
                // setConfirmPassword(value);
                // validateConfirmPass(value);
              }}
              value={value}
              leftIcon={<Icon name="lock-closed" type="ionicon" />}
              rightIcon={
                <Icon
                  name={hideConPass ? "eye" : "eye-off"}
                  type="ionicon"
                  onPress={() => {
                    setHideConPass(!hideConPass);
                  }}
                />
              }
              maxLength={25}
              secureTextEntry={hideConPass}
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
          name="confirmPassword"
        />

        <Button
          loading={isLoading}
          disabled={isLoading}
          title={"Register"}
          onPress={handleSubmit(onRegister)}
        />
      </View>

      {/* view block for Footer */}
      <View style={styles.footerBlock}></View>
      {/* <Spinner visible={isLoading} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/> */}
      <RNLSpinner isLoading={isLoading}/>
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
  spinnerTextStyle: {
    color: '#FFF'
  },
});
