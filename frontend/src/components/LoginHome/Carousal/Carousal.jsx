import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Carousal.css";
import { Link } from "react-router-dom";

const Carousal = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const apiKey = "634e2f77ea5af8af8758e53e75fe8937";

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`
      )
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies by genre:", error);
      });
  }, [genre]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    // Scroll to the current index when it changes
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="movie-carousel">
      {movies.length > 0 && (
        <div className="carousel-container">
          <button className="carousel-button prev-button" onClick={handlePrev}>
           
          </button>
          <div className="carousel" ref={carouselRef}>
            {movies.map((movie, index) => (
              <Link
                key={movie.id}
                to={`/movie-details/${movie.id}`}
                className={`movie-card ${index === currentIndex ? "active" : ""}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            ))}
          </div>
          <button className="carousel-button next-button" onClick={handleNext}>
            
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousal;
