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
  console.log(req);
  res.status(200).send("hihi");
});

app.post("/", uploader.any(), (req, res) => {
  //console.log(req);
  console.log(req);
  res.status(200).send({ test: "ok" });
});

app.listen(8080, () => {
  console.log("this server is running!");
});
