import React, { useState, useEffect } from "react";
import "./profile.module.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ProfileUpdate = () => {
  const [userId, setUserId] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [showPreferencesForm, setShowPreferencesForm] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token in update profile", token);
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("decoded token", decodedToken);
        setUserId(decodedToken.userId);
        console.log(userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user-data/${userId}`);
        const userDataFromBackend = response.data;

        // Update the state with user data
        setUsername(userDataFromBackend.username);
        setEmail(userDataFromBackend.email);

        // Initialize the selectedGenres and selectedLanguages with the user data from the backend
        const initialGenres = userDataFromBackend.genres.map(
          (genre) => genre.name
        );
        const initialLanguages = userDataFromBackend.languages.map(
          (language) => language.name
        );

        setSelectedGenres(initialGenres);
        setSelectedLanguages(initialLanguages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleBackendData = async () => {
    if (username && email) {
      // Format genres and languages as needed
      const formattedGenres = selectedGenres.map((genre) => ({
        name: genre,
      }));

      const formattedLanguages = selectedLanguages.map((language) => ({
        name: language,
      }));

      const userData = {
        username: username,
        email: email,
        password: password,
        genres: formattedGenres,
        languages: formattedLanguages,
      };

      try {
        console.log(userData);
        console.log("user id in update block", userId);
        // Send the userData object to your backend for update
        const response = await axios.put(`/update-user/${userId}`, userData);

        if (response.data.message === "User data updated successfully") {
          alert("Profile updated successfully");
        } else {
          alert("Failed to update profile.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    // Add more genres here
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Korean",
    "Chinese",
    "Russian",
    // Add more languages here
  ];

  const handleLanguageChange = (language) => {
    const isLanguageSelected = selectedLanguages.includes(language);

    if (isLanguageSelected) {
      // Language is unchecked, remove it from the selectedLanguages array
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      // Language is checked, add it to the selectedLanguages array
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleGenreChange = (genre) => {
    const isGenreSelected = selectedGenres.includes(genre);

    if (isGenreSelected) {
      // Genre is unchecked, remove it from the selectedGenres array
      setSelectedGenres(selectedGenres.filter((gen) => gen !== genre));
    } else {
      // Genre is checked, add it to the selectedGenres array
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="profile-update">
      {showSignUpForm && (
        <div className="sign-up-form">
          <h3>Update Profile</h3>
          <form>
            <div className="form-row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </div>
      )}
      {showPreferencesForm && (
        <div className="preferences-form">
          <div className="preferences-form-left">
            <h3>Change Language Preferences</h3>
            {/* Language Selection */}
            <div className="language-selection">
              {languages.map((language, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
          <div className="preferences-form-right">
            <h3>Change Genre Preferences</h3>
            {/* Genre Selection */}
            <div className="genre-selection">
              {genres.map((genre, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
          <div className="clear-both"></div>
          <button className="choose-plan-button" onClick={handleBackendData}>
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
