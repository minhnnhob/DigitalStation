require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const workoutsRouter = require("./routes/workouts");
const userRouter = require("./routes/user");
const artworkRouter = require("./routes/artwork");  
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

app.use("/api/workouts", workoutsRouter);
app.use("/api/users", userRouter);
app.use("/api/artworks", artworkRouter);


//connect to mongodb
app.listen(process.env.PORT, () => {
  console.log("Server is running on", process.env.PORT);
});