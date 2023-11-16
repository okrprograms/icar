import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { Button, Card, Icon } from "@rneui/themed";

/**
 *
 * onPictureSelected => Camera or Gallery it will give image path of selected image or capture image
 */

const MediaPicker = ({ show = false, handleClose, onPictureSelected }) => {
  //   const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //when user select the picture, then callback onPictureSelected with selected image path
      onPictureSelected(result.assets[0].uri);
    }
  };
  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (result.canceled === false) {
      onPictureSelected(result.assets[0].uri);
    }
  };
  return (
    <Modal isVisible={show}>
      <View style={styles.container}>
        <Card>
          <View style={styles.iconCons}>
            <Icon
              name="camera"
              size={100}
              type="ionicon"
              onPress={pickFromCamera}
            />
            <Icon name="image" size={100} type="ionicon" onPress={pickImage} />
          </View>
          <Button onPress={handleClose} title="Cancel" color={"brown"} />
        </Card>
      </View>
    </Modal>
  );
};

export default MediaPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'yellow',
    justifyContent: "flex-end",
  },
  iconCons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
