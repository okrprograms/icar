import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Input } from "@rneui/base";
import { Button, Icon, Text } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, fireStoreConfig } from "../db";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import {
  requiredRule,
  emailPatternRule,
  passMinLenRule,
  passMaxLenRule,
  passPatternRule,
} from "../utils/formRules";
import { errorToast, successToast } from "../utils/toastMessages";
import RNLSpinner from "../components/reactNativeLoadingSpinner";
import { RNCalendar } from "../components/calender";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RNDatePicker } from "../components/datepicker";
import moment from "moment";
import { pickImage } from "../utils/common";
import MediaPicker from "../components/mediaPicker";

const data = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
];
const Register = () => {
  const [hidePass, setHidePass] = useState(true);
  const [hideConPass, setHideConPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [avatarImageSource, setAvatarImageSource] = useState(null);
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
  const onRegister = async (data) => {
    setIsLoading(true);
    if (data.confirmPassword !== data.password) {
      errorToast("Password does not match!");
      setIsLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          const user = response.user;
          storeDataInCollection(data, user);
        })
        .catch((error) => {
          errorToast(error.message);
          setIsLoading(false);
        });
    }
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  async function storeDataInCollection(data, user) {
    try {
      // const usersColRef = await collection(fireStoreConfig, "users");
      const usersDoc = await doc(fireStoreConfig, "users", user.uid);
      // addDoc(usersColRef, {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   email: data.email,
      //   dob: data.dob,
      //   gender: data.gender,
      // });
      console.log(data.dob);
      const userForm = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dob: dob,
        gender: data.gender,
      };
      setDoc(usersDoc, userForm);
      successToast("User registered Successfully!");
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      errorToast(error.message);
      setIsLoading(false);
    }
  }
  const handleCalendarOpen = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleCalendarDate = (date) => {
    console.log(date);
    // setDob(date.dateString);
    setDob(date);
    handleCalendarOpen();
  };

  const onAvatarPressed = () => {
    // const response = await pickImage();
    // console.log(response);
    setShowMediaPicker(true);
  };
  const onPictureSelectedChange = (imagePath) => {
    setAvatarImageSource(imagePath);
  };
  return (
    <ScrollView>
      {/* view block for Logo */}
      <View style={styles.logoBlock}>
        {avatarImageSource ? (
          <Avatar
            size={"xlarge"}
            onPress={onAvatarPressed}
            // source={require("../../assets/car-icon.png")}
            source={{ uri: avatarImageSource }}
            rounded
          />
        ) : (
          <Avatar
            size={"large"}
            onPress={onAvatarPressed}
            source={require("../../assets/car-icon.png")}
            rounded
          />
        )}
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
        <TouchableOpacity onPress={handleCalendarOpen}>
          {/* <Icon name="calendar" type="ionicon" /> */}
          <Input
            disabled
            placeholder="DOB"
            leftIcon={<Icon name="calendar" type="ionicon" />}
            value={moment(dob).format("YYYY-MM-DD")}
          />
        </TouchableOpacity>
        {/* <Controller
          control={control}
          rules={{
            required: requiredRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled={isLoading}
              placeholder="DOB"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              leftIcon={<Icon name="calendar" type="ionicon" />}
              errorMessage={errors.dob && errors.dob.message}
            />
          )}
          name="dob"
        /> */}
        {/* {renderLabel()} */}
        <Controller
          control={control}
          rules={{
            required: requiredRule,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown
              // style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              style={{
                borderBottomWidth: 0.4,
                marginHorizontal: 10,
                marginVertical: 5,
              }}
              // placeholderStyle={{ color: "red" }}
              // selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={data}
              search={false}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Gender" : "..."}
              // searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setIsFocus(false);
                onBlur;
              }}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
                onChange(item.value);
              }}
              renderLeftIcon={() => (
                <Icon
                  name="people"
                  type="ionicon"
                  style={{ marginRight: 10 }}
                />
              )}
              // errorMessage={errors.gender && errors.gender.message}
            />
          )}
          name="gender"
        />
        {errors.gender && (
          <Text style={{ fontSize: 13, marginHorizontal: 15, color: "red" }}>
            {" "}
            {errors.gender.message}
          </Text>
        )}
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
      <RNLSpinner isLoading={isLoading} />
      {/* <RNCalendar
        show={isCalendarOpen}
        handleSelectedDate={(date) => handleCalendarDate(date)}
      /> */}
      <RNDatePicker
        show={isCalendarOpen}
        handleSelectedDate={(date) => handleCalendarDate(date)}
        handlePickerOpen={handleCalendarOpen}
        dob={dob}
      />
      <MediaPicker
        show={showMediaPicker}
        handleClose={() => setShowMediaPicker(!showMediaPicker)}
        onPictureSelected={(imagePath) => onPictureSelectedChange(imagePath)}
      />
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
    color: "#FFF",
  },
});
