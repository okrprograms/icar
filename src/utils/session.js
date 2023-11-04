import * as SecureStore from "expo-secure-store";
import { errorToast } from "./toastMessages";

async function startUserSession(key = "isLoggedIn", value = "true") {
  await SecureStore.setItemAsync(key, value);
}

async function stopUserSession(key = "isLoggedIn", value = "false") {
  await SecureStore.setItemAsync(key, value);
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

// async function checkUserSession() {
//     var isLoggedIn = false;
//     await SecureStore.getItemAsync("isLoggedIn")
//       .then((response) => {
//         if (response === "true") {
//           isLoggedIn = true;
//           // console.log(isLoggedIn);
//         } else {
//           isLoggedIn = false;
//           // console.log(isLoggedIn);
//         }
//       })
//       .catch((error) => {
//         errorToast(error.message);
//       });
//       // console.log(isLoggedIn);
//     return isLoggedIn;
//   }

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

export { startUserSession, stopUserSession, checkUserSession, getUserSession };
