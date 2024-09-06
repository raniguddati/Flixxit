const express = require("express");
const collection = require("../backend/mongo");
const Watchlist = require("../backend/watchlist");
const Wishlist = require("../backend/wishlist");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Your JWT secret key (keep it secret and secure)
const jwtSecretKey =
  "eb73b5d65b987bc89d4006cb62f11f2fced3bc3529bd69df0ddc62c3c70dc9abc58f8fb962d16d24cc67badb2d3804d00a788bc7628849b356af712e516eedf8d8adff37dd6cadedf489464ecfe847e2652d5bd1e328643050570dde0de2ad4754ab7204be10dfe06e42839dac527bc127ad64c46679217b604eb2da4720b135a2c67c5159b2b0600fb2302e076c807663c80a40510da46a9737ebdd3b3b90fa11b21189ba5aa6006968913d28e87c947690597ecd4ef8296f3e575a1572f04b0d57ae176524c21b467c233d5f69490669648cdc0b0cac979749b43551f7c0a61a0f22aaf5679f4778506fdc11be8295cc12ba72f16564446a329c1467bd7b3c";

app.get("/user-data/:userId", async (req, res) => {
  try {
    // Get the user ID from the request parameters
    console.log(req.params);
    const userId = req.params.userId;

    console.log("userId", userId);
    // Fetch data for the specific user based on their ID
    const userData = await collection.findOne({ _id: userId });

    if (!userData) {
      // If user data is not found, return a 404 Not Found response
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data as a JSON response
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password, selectedPlan, genres, languages } =
    req.body;

  try {
    const checkEmail = await collection.findOne({ email: email });

    if (checkEmail) {
      res.json({ message: "User already exists" });
    } else {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with the hashed password
      const userData = {
        username: username,
        email: email,
        password: hashedPassword,
        selectedPlan: selectedPlan,
        genres: genres,
        languages: languages,
      };
      console.log(userData);
      // Save the user data to the database
      await collection.create(userData);

      res.json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ error: "Signup failed. Please try again.", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Find the user by email in the database
    const user = await collection.findOne({ email: email });
    console.log(user);

    if (!user) {
      console.log("user not found");
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("password do not  match");
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Create a JWT token with user information
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecretKey,
      { expiresIn: "1h" } // Token expiration time (e.g., 1 hour)
    );

    const response = {
      user: user,
      token: token,
    };

    // Return the  response
    res.status(200).json(response);
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

app.put("/update-user/:userId", async (req, res) => {
  const userId = req.params.userId; // Extract user ID from the URL parameter
  const {
    username,
    email,
    selectedPlan,
    selectedGenres,
    selectedLanguages,
    password,
  } = req.body;

  try {
    // Find the user by ID in the database
    const user = await collection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the provided values
    user.username = username;
    user.selectedPlan = selectedPlan;
    user.selectedGenres = selectedGenres;
    user.selectedLanguages = selectedLanguages;

    // Check if a new password is provided
    if (password) {
      if (password) {
        // Hash the new password and save it to the user object
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
    }

    // Save the updated user data to the database
    await user.save();

    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ error: "Update failed. Please try again." });
  }
});

app.post("/watchlist/add", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    // Check if the movie already exists in the user's watchlist
    const existingWatchlistItem = await Watchlist.findOne({ userId, movieId });

    if (existingWatchlistItem) {
      // Movie already exists in the watchlist, return a response indicating that
      return res.json({ message: "Movie already in watchlist" });
    }

    // Create a new watchlist item
    const watchlistItem = new Watchlist({ userId, movieId });

    // Save the watchlist item to the database
    await watchlistItem.save();

    res.json({ message: "Movie added to watchlist" });
  } catch (error) {
    console.error("Failed to add movie to watchlist:", error);
    res.status(500).json({ error: "Failed to add movie to watchlist" });
  }
});

app.get("/watchlist/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch the user's watchlist items based on the userId
    const watchlist = await Watchlist.find({ userId });

    res.json(watchlist);
  } catch (error) {
    console.error("Failed to fetch watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

app.post("/wishlist/add", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    // Check if the movie already exists in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({ userId, movieId });

    if (existingWishlistItem) {
      // Movie already exists in the wishlist, so remove it
      await Wishlist.findOneAndDelete({ userId, movieId });

      res.json({ message: "Movie removed from wishlist" });
    } else {
      // Movie doesn't exist in the wishlist, so add it
      const wishlistItem = new Wishlist({ userId, movieId });
      await wishlistItem.save();

      res.json({ message: "Movie added to wishlist" });
    }
  } catch (error) {
    console.error("Error adding/removing movie to/from wishlist:", error);
    res
      .status(500)
      .json({ error: "Error adding/removing movie to/from wishlist" });
  }
});

app.get("/wishlist/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch the user's wishlist items based on the userId
    const wishlist = await Wishlist.find({ userId });

    res.json(wishlist);
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
