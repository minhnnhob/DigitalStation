const mongoose = require("mongoose");
//connect to mongodb
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     //Listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("Server is running on", process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log("Error connecting to the database", error);
//   });
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
}

module.exports = { connect };
