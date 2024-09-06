const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.createConnection(
  // "mongodb+srv://simisanjh3:flixxit@flixxit.319wg3r.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb://127.0.0.1:27017/flixxit-db"
  process.env.MONGO_URI
  // "mongodb+srv://raniguddati1995:sTFd6KTEvXACWIhd@rani-personal-cluster.56fbca4.mongodb.net/flixxit?appName=rani-personal-cluster"
);
// .then((x) => {
//   console.log(`MongoDB connected: "${x.connections[0].name}"`);
// })
// .catch((error) => {
//   console.error("MongoDB connection failed:", error);
// });

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
