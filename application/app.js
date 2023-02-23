const express = require('express');
const multer = require('multer');

var file_name = ["asdda", "asdsad"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/usr/src/app/videos') // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // specify the file name
    file_name.push(file.originalname)
    
  }
})

const upload = multer({ storage: storage })


const app = express();
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/temp.html');
})

app.get('/lists', (req, res) => {
  res.send(file_name)
})

app.post('/upload', upload.single('video'), (req, res, next) => {
  const video = req.file;
  if (!video) {
    const error = new Error('Please upload a video');
    error.httpStatusCode = 400;
    return next(error);
  }
  // do something with the uploaded file
  res.send('Video uploaded successfully');
  console.log(file_name)
})

app.listen(5002, () => console.log('Server is up and running'));