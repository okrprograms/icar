import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DatePicker from "react-native-date-picker";

const RNDatePicker = ({
  show = false,
  handleSelectedDate,
  handlePickerOpen,
  dob
}) => {
  return (
    <DatePicker
      modal
      open={show}
      date={dob}
      mode="date"
      onConfirm={(date) => {
        // setOpen(false)
        handlePickerOpen();
        handleSelectedDate(date);
      }}
      onCancel={() => {
        handlePickerOpen();
      }}
    />
  );
};

export { RNDatePicker };

const styles = StyleSheet.create({});
