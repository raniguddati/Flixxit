const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      serverSelectionTimeoutMS: 50000, // Set timeout to 30 seconds
    },
    {
      dbName: process.env.DATABASE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  genres: [
    {
      id: Number, // Change the type to Number or another appropriate type
      name: String, // Change the type to String
    },
  ],
  languages: [
    {
      code: String, // Change the type to String
      name: String, // Change the type to String
    },
  ],
  selectedPlan: {
    type: String,
  },
  paymentMethod: {
    type: Object,
  },
});

const collection = mongoose.model("collection", userSchema);

module.exports = collection;
