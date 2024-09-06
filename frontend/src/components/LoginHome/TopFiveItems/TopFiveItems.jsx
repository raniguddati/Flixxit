import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./TopFiveItems.css";
import { fetchTopMoviesOfWeek } from "../../utils/tmdb";

const TopFiveItems = () => {
  const [topFiveMovies, setTopFiveMovies] = useState([]);

  useEffect(() => {
    // Fetch top movies when the component mounts
    fetchTopMoviesOfWeek()
      .then((data) => setTopFiveMovies(data))
      .catch((error) => console.error(error));
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="recommended-section">
      <h2 className="top-heading">Top 5 Of Week</h2>
      <div className="double-line-numbers">
        {topFiveMovies.map((movie, index) => (
          // Wrap the div containing the movie card inside a Link component
          <Link to={`/movie-details/${movie.id}`} key={index}>
            <div className="number-container">
              <div className="number">#{index + 1}</div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="number-image"
                alt={movie.title}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopFiveItems;
