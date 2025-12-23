const mongoose = require("mongoose");

const connectMongodbURL = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Mongodb connected Done!!!!");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}; 

module.exports = connectMongodbURL;
