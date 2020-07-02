const express = require("express");
const app = express();
const PORT = 8080;

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const { userRoute, commentRoute, postRoute } = require("./2.routes");

app.use("/users", userRoute);
app.use("/comments", commentRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("<h1>Pict Perfect API</h1>");
});

app.listen(PORT, () => {
  console.log("Listening in port " + PORT);
});
