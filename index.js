const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//static path
app.use(express.static(path.join(__dirname, "client")));

//middleware
app.use(bodyParser.json());

const publicVapidKey =
  "BIBWT5RYEctp-kjznLC0aNEu9JZTB8QCii2AqugRnwGemLFE0fz59cC5ZJJTnliBEbQI-jgSZ8swWmZlRQHA5Yg";
const privateVapidKey = "vY72_XZo4oGOxGO7HJJfZleGIUwKv6tFUrf-YmEA_B8";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//subscribe route
app.post("/subscribe", (req, res) => {
  //Get Push Notification Object
  const subscription = req.body;

  //send 201
  res.status(201).json({});

  //create payload
  const payload = json.stringify({ title: "ims System" });

  //pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 3000;
app.listen(port, () => console.log(`Server Started at port ${port}`));
