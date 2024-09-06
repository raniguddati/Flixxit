// utils/tmdb.js (a separate file for API-related code)
import axios from "axios";

const API_KEY = "634e2f77ea5af8af8758e53e75fe8937"; // Replace with your TMDb API key

export async function fetchTopMoviesOfWeek() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results.slice(0, 5); // Get the top 5 movies
  } catch (error) {
    throw new Error("Error fetching top movies: " + error.message);
  }
}

export async function fetchKidsMovies() {
  try {
    const queryParams = {
      with_genres: "16", // Genre ID for Animation
      certification_country: "US",
      certification: "G",
      sort_by: "popularity.desc",
      page: 1,
    };

    // Make an API request to get kids' movies
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
      { params: queryParams }
    );

    if (response.status !== 200) {
      throw new Error("Error fetching kids' movies");
    }

    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching kids' movies: " + error.message);
  }
}

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    if (response.data.results && response.data.results.length > 0) {
      // Take the first trending movie from the response
      const trendingMovieData = response.data.results[0];
      console.log(trendingMovieData);

      // Create an object with the required data
      const trendingMovieInfo = {
        id: trendingMovieData.id,
        title: trendingMovieData.title,
        description: trendingMovieData.overview,
        backdrop_path: `https://image.tmdb.org/t/p/original${trendingMovieData.backdrop_path}`,
      };

      return trendingMovieInfo;
    }
  } catch (error) {
    console.error("Error fetching trending movie:", error);
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return null;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Function to fetch movie trailers by movie ID
export const fetchMovieTrailers = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    if (response.status === 200) {
      return response.data.results;
    }
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return [];
  }
};
