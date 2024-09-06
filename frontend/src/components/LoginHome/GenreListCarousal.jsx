import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousal from "./Carousal/Carousal";
import "./GenreListCarousal.css"; // Import the CSS stylesheet

const MovieGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Function to fetch movie genres from TMDB API
    const fetchMovieGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=634e2f77ea5af8af8758e53e75fe8937`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    // Call the function to fetch movie genres when the component mounts
    fetchMovieGenres();
  }, []);

  return (
    <div>
      <ul className="genre-list">
        {genres.map((genre) => (
          <li key={genre.id} className="genre-item">
            <div className="genre-header">
              <h1 className="list-heading">{genre.name}</h1>
              <Link to={`/genre-search?query=${genre.id}`} key={genre.id}>
                <button className="view-more-button">View More</button>
              </Link>
            </div>
            <Carousal genre={genre.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieGenres;
