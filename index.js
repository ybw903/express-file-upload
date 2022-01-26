const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploader = multer({ storage: storage });

app.get("/", (req, res) => {
  res.status(200).send("hihi");
});

app.post("/", uploader.any(), (req, res) => {
  //console.log(req);
  console.log(req);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment");
  res.sendFile(req.files[0].path, (err) => {
    console.log(err);
  });
});

app.listen(8080, () => {
  console.log("this server is running!");
});
