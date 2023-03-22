const express = require("express");
const multer = require("multer");
const cors = require("cors");

var urlNginx = "http://localhost:3030/hls/";
var suffix = "/master.m3u8";
/// these have to use Mongo to store ////
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
    videos_storage.push({
      url: `${urlNginx}${file.originalname}${suffix}`,
      poster: "a",
    });
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
app.get("/videos", (req, res) => {
  res.send(videos_storage);
});

app.post("/upload", upload.single("file"), (req, res, next) => {
  const video = req.file;
  if (!video) {
    const error = new Error("Please upload a video");
    error.httpStatusCode = 400;
    return next(error);
  }
  // do something with the uploaded file
  res.send("Video uploaded successfully");
  console.log(file_name);
});

app.listen(5002, () => console.log("Server is up and running"));
