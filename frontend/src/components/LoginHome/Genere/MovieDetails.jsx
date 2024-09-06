import React, { useState, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js styles
import "videojs-youtube"; // Import the Video.js YouTube plugin
import {
  FaHeart,
  FaThumbsUp,
  FaThumbsDown,
  FaPlayCircle,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./MovieDetails.css"; // Import your custom CSS
import jwt_decode from "jwt-decode";
import axios from "axios";

const MovieDetails = ({ movie, reviews, cast, video }) => {
  const { movieId } = useParams();
  console.log(movieId);
  const [userId, setUserId] = useState("");
  console.log("userId :>> ", userId);
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };
  useEffect(() => {
    getUserIdFromToken();
  }, []);

  const [expandedReviewIndex, setExpandedReviewIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [videoNotAvailableAlertShown, setVideoNotAvailableAlertShown] =
    useState(false);
  const [playerWidth, setPlayerWidth] = useState(window.innerWidth); // Initial width based on screen width
  const [playerHeight, setPlayerHeight] = useState(window.innerHeight); // Initial height based on screen height
  const [isFav, setIsFav] = useState(false);
  // Create a ref to hold the video player element
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    // Check if a video key is available
    if (selectedVideoKey) {
      // Initialize Video.js player
      const player = videojs(videoPlayerRef.current, {
        techOrder: ["youtube"], // Use the YouTube tech
        autoplay: false, // Set to true if you want the video to autoplay
        sources: [
          {
            type: "video/youtube",
            src: `https://www.youtube.com/watch?v=${selectedVideoKey}`,
          },
        ],
        width: playerWidth, // Set the width based on screen width
        height: playerHeight,
      });

      const handleEscapeKeyPress = (event) => {
        if (event.key === "Escape") {
          closeModal(); // Call the closeModal function when "Escape" is pressed
        }
      };

      if (player) {
        player.on("ended", () => {
          closeModal(); // Call the closeModal function when the video ends
        });
      }

      window.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        // Dispose of the Video.js player when the component unmounts
        if (player) {
          player.dispose();
        }
      };
    }
  }, [selectedVideoKey]);

  const handleLike = () => {
    setSelectedOption("like");
    // You can also send the like to TMDB here
  };

  const handleDislike = () => {
    setSelectedOption("dislike");
    // You can also send the dislike to TMDB here
  };

  const toggleReviewVisibility = (index) => {
    if (expandedReviewIndex === index) {
      setExpandedReviewIndex(-1); // Collapse the currently expanded review
    } else {
      setExpandedReviewIndex(index); // Expand the clicked review
    }
  };

  const openModal = (videoKey) => {
    setIsModalOpen(true);
    setSelectedVideoKey(videoKey);

    // Check if videoKey is not available and the alert has not been shown yet
    if (!videoKey) {
      alert("Video not available");
      setVideoNotAvailableAlertShown(true);
    } else if (userId && movie.id) {
      // Use Axios or any other HTTP library to make a POST request to your backend
      axios
        .post("/watchlist/add", {
          userId: userId,
          movieId: movieId,
        })
        .then((response) => {
          console.log("Added to watchlist:", response.data);
        })
        .catch((error) => {
          console.error("Error adding to watchlist:", error);
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // Pause the video when closing the modal
    if (videoPlayerRef.current) {
      const player = videojs(videoPlayerRef.current);
      if (player) {
        player.pause();
      }
    }
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return (
        <div className="reviews no-reviews">
          <p>No reviews available.</p>
        </div>
      );
    }

    return (
      <div className="reviews">
        <h2>Reviews:</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <h3>Author: {review.author}</h3>
              <br />
              {index === expandedReviewIndex
                ? review.content
                : `${review.content.substring(0, 300)}...`}
              {review.content.length > 300 && (
                <button onClick={() => toggleReviewVisibility(index)}>
                  {index === expandedReviewIndex ? "Show Less" : "Show More"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCast = () => {
    if (cast.length === 0) {
      return <p>No cast information available.</p>;
    }

    return (
      <div className="cast">
        <h2>Cast:</h2>
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <div className="actor-info">
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={`${actor.name}'s profile`}
                  />
                )}
                <div className="actor-details">
                  <h3>{actor.name}</h3>
                  <p>Character: {actor.character}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleFavClick = async () => {
    try {
      // If a user is logged in, make a request to add or remove the movie from the wishlist
      const response = await axios.post("/wishlist/add", {
        movieId: movieId,
        userId: userId,
      });

      // Extract the message from the response
      const message = response.data.message;

      // Show a message alert
      alert(message);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // Show an error message if the backend API call fails
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const renderVideo = () => {
    if (!selectedVideoKey) {
      return null;
    }

    return isModalOpen ? (
      <div className="video-modal">
        <div className="video-modal-content">
          <span
            className="close-button black"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "24px",
              zIndex: 9999, // Ensure the close button is on top
            }}
          >
            &times;
          </span>

          <video
            ref={videoPlayerRef} // Set the ref to the video player element
            className="video-js vjs-default-skin"
            controls
            width="640" // Set the width here (e.g., 640 pixels)
            height="360" // Set the height here (e.g., 360 pixels)
          />
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="movie-info-container">
      <div className="movie-details">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>User Score:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Tagline:</strong> {movie.tagline}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>

          <p>
            <strong>Original Language:</strong> {movie.original_language}
          </p>
          {/* Add more details as needed */}
          <div className="movie-actions">
            <button className="action-button" onClick={handleFavClick}>
              <FaHeart
                className={`action-icon ${isFav ? "heart-selected" : ""}`}
              />
            </button>
            <button
              className={`action-button ${
                selectedOption === "like" ? "selected" : ""
              }`}
              onClick={handleLike}
            >
              <FaThumbsUp className="action-icon like" />
            </button>
            <button
              className={`action-button ${
                selectedOption === "dislike" ? "selected" : ""
              }`}
              onClick={handleDislike}
            >
              <FaThumbsDown className="action-icon dislike" />
            </button>
            <button
              className="action-button"
              onClick={() => openModal(video[0]?.key)}
            >
              <FaPlayCircle className="action-icon" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>
      <div className="movie-about">
        {renderReviews()}
        {renderCast()}
        {renderVideo()}
      </div>
    </div>
  );
};

export default MovieDetails;
