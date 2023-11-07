import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Calendar } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";
const RNCalendar = ({ show = false, handleSelectedDate }) => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  return (
    show === true && (
      <BottomSheet index={1} snapPoints={["70%", "70%"]}>
        <Calendar
          onDayPress={(day) => {
            handleSelectedDate(day);
          }}
        />
      </BottomSheet>
    )
  );
};

export { RNCalendar };

const styles = StyleSheet.create({});
