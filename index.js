const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const FormData = require("form-data");
const fs = require("fs");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploader = multer({ storage: storage });
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.status(200).send("hihi");
});

app.post("/process/file", uploader.any(), (req, res) => {
  console.log("requested: /process/file");
  console.log(req.files);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment");
  res.sendFile(req.files[0].path, (err) => {
    console.log(err);
  });
});

// 멀티파트 응답
app.post("/v2/process/file", uploader.any(), (req, res) => {
  console.log("requested: /v2/process/file");
  const form = new FormData();
  req.files.forEach((file, i) => {
    console.log(file);
    form.append(`file[${i}]`, fs.readFileSync(file.path), file.filename);
  });
  res.setHeader(
    "x-Content-Type",
    "multipart/form-data; boundary=" + form._boundary
  );
  res.setHeader("Content-Type", "application/octet-stream");
  form.pipe(res);
});

app.listen(8080, () => {
  console.log("this server is running!");
});
