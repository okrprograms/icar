import Toast from "react-native-toast-message";

function customToast(title = "", message = "", position = "top", type = "success") {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    position: position,
  });
}

function successToast(message = "", position = "top", type = "success") {
  Toast.show({
    type: type,
    text1: "Success",
    text2: message,
    position: position,
  });
}

function errorToast(message = "", position = "top", type = "error") {
  Toast.show({
    type: type,
    text1: "Error",
    text2: message,
    position: position,
  });
}

export { customToast, successToast, errorToast };
