// Import the functions you need from the SDKs you need
const Firebase = require("firebase/app");
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0di9FWtPXHUOZDVexTFLNa9ii40vOdxo",
  authDomain: "test-59690.firebaseapp.com",
  projectId: "test-59690",
  storageBucket: "test-59690.appspot.com",
  messagingSenderId: "653249682666",
  appId: "1:653249682666:web:5cb72fe9b26b4830680b93",
};

const FirebaseApp = Firebase.initializeApp(firebaseConfig);
const firestore = FirebaseApp.firestore();

async function addVideos(videoName, videoUrl, videoDescription) {
  const videoRef = firestore.collection("videos").doc();
  await videoRef.set({
    name: videoName,
    url: videoUrl,
    description: videoDescription,
  });
  console.log("Videos added:", videoName);
}

async function updateVideos(videoName, newDescription) {
  try {
    const [videoID, videoData] = await getVideoByName(videoName);
    const videoRef = firestore.collection("videos").doc(videoID);
    videoData.description = newDescription;
    await videoRef.update(videoData);
    console.log("Videos updated:", videoName);
    return videoName;
  } catch (error) {
    console.error("Error updating videos:", error);
    return null;
  }
}

async function getVideos() {
  const snapshot = await firestore.collection("videos").get();
  let videos = [];
  snapshot.forEach((doc) => {
    videos.push(doc.data());
    // console.log(doc.id, "=>", doc.data());
  });
  return videos;
}

async function getVideoByName(videoName) {
  const query = firestore.collection("videos").where("name", "==", videoName);
  const snapshot = await query.get();
  let video;
  let videoID;
  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      // console.log("Videos:", doc.data());
      video = doc.data();
      videoID = doc.id
    });
  } else {
    console.log("No  found");
  }
  return [videoID, video];
}

async function deleteVideoByName(videoName) {
  try {
    const query = firestore.collection("videos").where("name", "==", videoName);
    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete();
        console.log("Video deleted:", doc.id);
      });
    } else {
      console.log("No Video found.");
    }
  } catch (error) {
    console.error("Error deleting Video:", error);
  }
}

module.exports = {
  addVideos,
  updateVideos,
  getVideos,
  deleteVideoByName,
};
