import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NotFound from "../../assets/notFound.png";

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [userId, setUserId] = useState("");
  const [imageList, setImageList] = useState([]);
  const [noMoviesMessage, setNoMoviesMessage] = useState("");
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

  const fetchWatchlistMovies = async () => {
    try {
      const response = await axios.get(`/watchlist/${userId}`);
      console.log("response :>> ", response);

      // Set the fetched watchlist movies in the state
      setWatchlistMovies(response.data);
    } catch (error) {
      console.error("Error fetching watchlist movies:", error);
    }
  };

  useEffect(() => {
    fetchWatchlistMovies();
  }, [userId]);

  useEffect(() => {
    // Extract movie IDs from the watchlist
    const movieIds = watchlistMovies.map((movie) => movie.movieId);

    // Function to fetch movie images from TMDB by movie IDs
    const fetchMovieImagesByIds = async (movieIds) => {
      try {
        const apiKey = "634e2f77ea5af8af8758e53e75fe8937";

        const movieImages = await Promise.all(
          movieIds.map(async (movieId) => {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
            );
            return {
              id: response.data.id,
              imageUrl: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            };
          })
        );

        setImageList(movieImages);
        if (movieImages.length === 0) {
          setNoMoviesMessage("Watched no movies yet.");
        } else {
          setNoMoviesMessage("");
        }
      } catch (error) {
        console.error("Error fetching movie images by IDs from TMDB:", error);
      }
    };

    fetchMovieImagesByIds(movieIds);
  }, [watchlistMovies]);

  return (
    <div className="view">
      <div className="movie-library">
        {noMoviesMessage ? (
          <div className="no-movies-container">
            <p className="no-movies-message">{noMoviesMessage}</p>

            <img src={NotFound} alt="No movies" className="no-movies-image" />
          </div>
        ) : (
          <div className="movie-list">
            {imageList.map((movie, index) => (
              <Link
                to={`/movie-details/${movie.id}`}
                key={movie.id}
                className="movie-card-link"
              >
                <div className="movie-card">
                  <img src={movie.imageUrl} alt={`Movie Poster ${index}`} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
