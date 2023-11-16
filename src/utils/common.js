import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    // setImage(result.assets[0].uri);
    return result.assets[0].uri;
  }
};

export { pickImage };
