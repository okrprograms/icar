import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { getDoc, doc } from "firebase/firestore";
import { fireStoreConfig } from "../db";
import { getUserUid } from "../utils/session";
import { customToast } from "../utils/toastMessages";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    attemptToGetProfileData();
  }, []);

  const attemptToGetProfileData = async () => {
    setIsLoading(true);
    const uid = await getUserUid();
    const docRef = doc(fireStoreConfig, "users", uid);
    const response = await getDoc(docRef);
    if (response.exists()) {
      setUserData(response.data());
    } else {
      customToast(
        "Not Found",
        "User not found with given Uid",
        "top",
        "warning"
      );
    }
    setIsLoading(false);
  };

  return (
    <View>
      <Text>{JSON.stringify(userData)}</Text>
      <Spinner visible={isLoading} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
