import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewAll.css";
import Pagination from "./pagination";

const ViewAll = () => {
  // const imagesPerPage = 25;
  const totalPages = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [imageList, setImageList] = useState([]);

  // Function to fetch random movie images from TMDB
  const fetchRandomMovieImages = async () => {
    try {
      const apiKey = "634e2f77ea5af8af8758e53e75fe8937";
      const randomPage = Math.floor(Math.random() * totalPages) + 1;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${randomPage}`
      );
      const movies = response.data.results;
      const randomImages = movies.map((movie) => {
        return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      });
      setImageList(randomImages);
    } catch (error) {
      console.error("Error fetching random movie images from TMDB:", error);
    }
  };

  useEffect(() => {
    // Fetch random movie images when the page changes
    fetchRandomMovieImages();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="view">
      <div className="movie-library">
        <div className="movie-list">
          {imageList.map((imageUrl, index) => (
            <div key={index} className="movie-card">
              <img src={imageUrl} alt={`Movie Poster ${index}`} />
            </div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ViewAll;
