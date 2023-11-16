import * as SecureStore from "expo-secure-store";
import { errorToast } from "./toastMessages";

async function startUserSession(key = "isLoggedIn", value = "true") {
  await SecureStore.setItemAsync(key, value);
}

async function stopUserSession(key = "isLoggedIn", value = "false") {
  await SecureStore.setItemAsync(key, value);
}
async function saveUerUid(Uid) {
  await SecureStore.setItemAsync("uid", Uid);
}
async function getUserUid() {
  try {
    const uid = await SecureStore.getItemAsync("uid");
    return uid;
  } catch (error) {
    errorToast(error.message);
  }
}
async function removeUerUid() {
  await SecureStore.setItemAsync("uid", "");
}
function checkUserSession() {
  var isLoggedIn = false;
  SecureStore.getItemAsync("isLoggedIn")
    .then((response) => {
      if (response === "true") {
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
      }
    })
    .catch((error) => {
      errorToast(error.message);
    });
  return isLoggedIn;
}

async function getUserSession() {
  try {
    var response = await SecureStore.getItemAsync("isLoggedIn");
    if (response === "true") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    errorToast(error.message);
  }
}

export {
  startUserSession,
  stopUserSession,
  checkUserSession,
  getUserSession,
  saveUerUid,
  getUserUid,
  removeUerUid,
};
