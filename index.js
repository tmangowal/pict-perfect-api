const express = require("express");
const app = express();
const PORT = 8080;
const S3 = require("aws-sdk/clients/s3");

const multer = require("multer");
const upload = multer();

const S3Client = new S3({
  credentials: {
    accessKeyId: "28SF7A4FT2RY1DFT8607",
    secretAccessKey: "YrgMN7qj6BMazCFMooYmQ7xRcknXW9597K4jRq1u",
  },
  endpoint: "https://ap-south-1.linodeobjects.com/",
  region: "ap-south-1",
});

const bodyParser = require("body-parser");
const cors = require("cors");

express.static("/uploads/post");

app.use(bodyParser.json());
app.use(cors());

const { userRoute, commentRoute, postRoute } = require("./2.routes");

app.use("/users", userRoute);
app.use("/comments", commentRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("<h1>Pict Perfect API</h1>");
});

// app.post("/testupload", upload.single("photo"), (req, res) => {
//   S3Client.upload(
//     {
//       Bucket: "pict-perfect",
//       Body: req.file.buffer,
//       Key: `TEST-${new Date().getTime()}.${req.file.mimetype.split("/")[1]}`,
//     },
//     (err, data) => {
//       if (err) throw err;

//       console.log(data);
//     }
//   );

//   res.send({});
// });

app.listen(PORT, () => {
  console.log("Listening in port " + PORT);
});
