/*** a func to convert any file to be uplaodable  */
const imgToBlob = async (uri) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.responseType = "blob";
    const blobPromise = new Promise((resolve, reject) => {
      xhr.onload = () => {
        const blob = xhr.response;
        resolve(blob);
      };
      xhr.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
    xhr.send();
    const blob = await blobPromise;
    return blob;
  } catch (error) {
    console.error(error);
  }
};

const generateUniqueImgName = () => {
  const prefix = "img_profile_";
  const postfix = ".png";
  const randomNumber = Math.random(0, 1);

  const name = prefix + randomNumber + postfix;

  return name;
};
const generateImgNameWithUid = (uid) => {
  const prefix = "img_profile_";
  const postfix = ".png";
  const randomNumber = Math.random(0, 1);
  if (uid == null || uid == "") {
    uid = randomNumber;
  }
  const name = prefix + uid + postfix;

  return name;
};

export { imgToBlob, generateImgNameWithUid, generateUniqueImgName };
