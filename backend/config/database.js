const mongoose = require("mongoose");
require("dotenv").config();

const database = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection successfully"))
    .catch((error) => {
      console.log("Db connection fail");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = database;
