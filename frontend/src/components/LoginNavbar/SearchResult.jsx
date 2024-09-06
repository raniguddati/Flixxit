import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      // Replace 'YOUR_API_KEY' with your actual TMDb API key
      const API_KEY = "634e2f77ea5af8af8758e53e75fe8937";

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        )
        .then((response) => {
          setResults(response.data.results);
        })
        .catch((error) => {
          console.error("Error searching movies:", error);
        });
    }
  }, [query]);

  const styles = {
    container: {
      textAlign: "center",
      color: "white",
    },
    movieList: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    movieCard: {
      border: "1px solid #ccc",
      margin: "10px",
      padding: "10px",
      width: "200px",
      height: "320px",
      overflow: "hidden",
      background: "#333",
      color: "white",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    },
    movieTitle: {
      fontWeight: "bold",
    },
    movieImage: {
      width: "100%",
      height: "85%",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Search results for: {query}</h2>
      <div style={styles.movieList}>
        {results.map((movie) => (
          // Wrap the entire card with a Link component
          <Link
            to={`/movie-details/${movie.id}`}
            key={movie.id}
            style={styles.link}
          >
            <div style={styles.movieCard}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={styles.movieImage}
              />
              <p style={styles.movieTitle}>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
