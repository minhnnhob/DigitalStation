require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const workoutsRouter = require("./routes/workouts");
const userRouter = require("./routes/user");
const artworkRouter = require("./routes/artwork");
const topicRouter = require("./routes/topic");
const tagRouter = require("./routes/tags");
const followerRouter = require("./routes/followers");
const likeRouter = require("./routes/like");
const commentRouter = require("./routes/comment");
const artnotiRouter = require("./routes/artnoti");



// job system
const jobRouter = require("./routes/jobs");
const recruitmentRouter = require("./routes/recruiment");
const studioRouter = require("./routes/studio");

const cros = require("cors");
const db = require("./config/db");
const app = express();

//connect to mongodb
db.connect();

//cross origin resource sharing
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend origin
  credentials: true, // Allow credentials
};

//middleware
app.use(cros(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
// app.use("/", (req, res) => {
//   res.send("welcome to the server!This works");
// });
app.use("/workouts", workoutsRouter);
// social
app.use("/api/users", userRouter);
app.use("/api/artworks", artworkRouter);
app.use("/api/topics", topicRouter);
app.use("/api/tags", tagRouter);
app.use("/api/follow", followerRouter);
app.use("/api/like", likeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/notification", artnotiRouter);

//job system
app.use("/api/jobs", jobRouter);

app.use("/api/recruitment", recruitmentRouter);
app.use("/studio", studioRouter);

//connect to mongodb
app.listen(process.env.PORT, () => {
  console.log("Server is running on", process.env.PORT);
});
