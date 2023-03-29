const express = require("express");
const multer = require("multer");
const cors = require("cors");
const firebaseService = require("./firebase-service");

var urlNginx = "http://localhost:3030/hls/";
var suffix = "/master.m3u8";
var file_name = [];
var videos_storage = [];
/////////////////////////////////////////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '/usr/src/app/videos') // specify the upload directory
    cb(null, "./videos"); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // specify the file name
    file_name.push(file.originalname);
    // videos_storage.push({
    //   url: `${urlNginx}${file.originalname}${suffix}`,
    //   name: file.originalname,
    // });
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log(req);
  res.sendFile(__dirname + "/temp.html");
});

// api to retrieve all list of videos
app.get("/videos", async (req, res) => {
  res.send(await firebaseService.getVideos());
});

// api to delete a video by name
app.delete("/delete/:name", async (req, res) => {
  console.log(req);
  const videoName = req.params.name;
  const response = await firebaseService.deleteVideoByName(videoName);
  if (response){
    res.status(200).send("OK");
  }else{
    res.status(204).send(`Not Found: ${videoName}`);
  }
});

// api to update the video
app.put("/update", async (req, res) => {
  // console.log(req);
  const videoName = req.body.name;
  const videoDescription = req.body.description;
  const response = await firebaseService.updateVideos(videoName, videoDescription);
  if (response){
    res.status(200).send("OK");
  }else{
    res.status(204).send(`Not Found: ${videoName}`);
  }
});

app.post("/upload", upload.single("file"), (req, res, next) => {
  const video = req.file;
  if (!video) {
    const error = new Error("Please upload a video");
    error.httpStatusCode = 400;
    return next(error);
  }
  // add to firebase after done uploading
  firebaseService.addVideos(
    req.body.name,
    `${urlNginx}${video.originalname}${suffix}`,
    req.body.description
  );
  // firebaseService.addVideos(file.originalname, `${urlNginx}${file.originalname}${suffix}`, req.body.name);
  res.send("Video uploaded successfully");
});

app.listen(5002, () => console.log("Server is up and running"));
