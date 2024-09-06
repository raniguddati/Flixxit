import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieCarousel.css";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 6; // Number of movies to display per page

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual TMDB API key
    const apiKey = "634e2f77ea5af8af8758e53e75fe8937";

    // Fetch popular movies from TMDB
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results);
          // Initialize visible movies with the first page
          setVisibleMovies(response.data.results.slice(0, moviesPerPage));
        }
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  }, []);

  // Function to handle moving to the previous page
  const handlePrev = () => {
    if (currentIndex > 0) {
      const startIndex = currentIndex - moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      setVisibleMovies(movies.slice(startIndex, endIndex));
      setCurrentIndex(startIndex);
    }
  };

  // Function to handle moving to the next page
  const handleNext = () => {
    if (currentIndex + moviesPerPage < movies.length) {
      const startIndex = currentIndex + moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      setVisibleMovies(movies.slice(startIndex, endIndex));
      setCurrentIndex(startIndex);
    }
  };

  return (
    <div className="movie-carousel" >
      {movies.length > 0 && (
        <div className="carousel-container">
          <div className="carousel">
            {visibleMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
          <div className="carousel-controls">
            <div className="prev-button-container">
              <button className="prev-button" onClick={handlePrev}></button>
            </div>
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
