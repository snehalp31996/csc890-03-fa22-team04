const mongoose = require("mongoose");
const morgan = require("morgan");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
