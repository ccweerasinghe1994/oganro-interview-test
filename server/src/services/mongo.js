const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://chamara:O3WIO4UZYyXdPKmR@posts.fjpjj.mongodb.net/budget?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongo DB Connection is ready");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}
module.exports = { mongoConnect, mongoDisconnect };
