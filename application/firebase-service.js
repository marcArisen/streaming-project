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
  appId: "1:653249682666:web:5cb72fe9b26b4830680b93"
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
  
  async function updateVideos(videoName, data) {
    const videoRef = firestore.collection("videos").doc(videoName);
  
    await videoRef.update(data);
  
    console.log("Videos updated:", videoName);
  }
  
  async function getVideos() {
    const snapshot = await firestore.collection("videos").get();
    let videos = [];
  
    snapshot.forEach((doc) => {
        videos.push(doc.data());
    //   console.log(doc.id, "=>", doc.data());
    });
    return videos;
  }

  async function getVideoByName(videoName) {
    const query = firestore.collection("videos").where("name", "==", videoName);
    const snapshot = await query.get();
    let video;
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        // console.log("Videos:", doc.data());
        video = doc.data();
      });
    } else {
      console.log("No  found");
    }
    return videos;
  }

  module.exports = {
    addVideos,
    updateVideos,
    getVideos
  }