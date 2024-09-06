import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import movie1 from "../../assets/banner2.png";
import device from "../../assets/devices.png";
import romance from "../../assets/romance.jpeg";
import horror from "../../assets/horror.jpeg";
import kids from "../../assets/kids.jpg";
import comedy from "../../assets/comedy.jpeg";
import documentary from "../../assets/documentary.jpeg";
import MovieCarousel from "../Carousal/MovieCarousal";

const Home = () => {
  const userToken = localStorage.getItem("token");

  const genres = [
    {
      id: 1,
      name: "Comedy",
      image: comedy,
      description:
        "Comedy films offer humor, wit, and amusing characters. They provide an enjoyable escape and lift spirits with laughter.",
    },
    {
      id: 2,
      name: "Documentary",
      image: documentary,
      description:
        "Documentaries explore real-life subjects, offering factual and thought-provoking insights. They inform, educate, and inspire.",
    },
    {
      id: 3,
      name: "Horror",
      image: horror,
      description:
        "Horror movies immerse viewers in fear suspense. They create eerie atmospheres and spine-tingling moments that captivate and shock.",
    },
    {
      id: 4,
      name: "Romance",
      image: romance,
      description:
        "Romance films celebrate love, passion, and human connections. They tell heartwarming stories of affection and the enduring power of love.",
    },
  ];

  return (
    <div className="home">
      <div className="banner">
        <div className="banner-left">
          <img
            src={movie1}
            alt="Banner"
            style={{
              maxWidth: "100%",
              // maxHeight: "75vh",
              // width: "auto",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="content">
          <h1>Welcome to Flixxit</h1>
          <p>Your gateway to unlimited entertainment</p>
          <div className="email-input">
            {/* <input type="email" placeholder="Enter your email" /> */}
            {userToken ? (
              // If token is present, link to the dashboard
              <Link to="/home">
                <button>Get Started</button>
              </Link>
            ) : (
              // If token is not present, link to the signup page
              <Link to="/signup">
                <button>Get Started</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* New Section: Latest Releases */}
      <div className="latest-releases">
        <div className="section-header">
          <h2>Watch the latest cinema releases on Flixxit</h2>
          <div className="button-container">
            <Link to="/signUp">
              <button className="buttons">JOIN NOW</button>
            </Link>
            <Link to="/viewall">
              <button className="buttons">VIEW ALL</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Placeholder Carousel */}
      <div className="movie-carousel">
        <MovieCarousel />
      </div>

      {/* New Section: Genre */}
      <div className="genre-section">
        <h1>Genre Gallery: Explore Cinematic Diversity</h1>
        {genres.map((genre) => (
          <div className="genre-item" key={genre.id}>
            <img src={genre.image} alt={genre.name} />
            <div className="genre-info">
              <h3>{genre.name}</h3>
              <p>{genre.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* New Section: Kids section*/}
      <div className="kids_section">
        <div className="kids-left">
          <img src={kids} alt="" />
        </div>
        <div className="kids-right">
          <h1>Craft profiles for your kids </h1>
          <p>
            Embark on exciting journeys with their beloved characters in an
            exclusive space designed just for them – all included with your
            membership at no extra cost.
          </p>
        </div>
      </div>
      {/* New Section: Watch on Every Device */}
      <div className="watch-on-every-device">
        <div className="section-content">
          <div className="centered-content">
            <h1>Watch Anywhere</h1>
            <p>Stream your favorite content on all your devices</p>
            <img src={device} alt="Watch on Every Device" />
          </div>
        </div>
      </div>

      {/* New Section: Sign Up */}
      <div className="sign-up-section">
        <div className="section-content">
          <h2>Sign Up for Flixxit</h2>
          <p>
            Unlock a world of boundless entertainment by signing up for Flixxit.
            Join our community and gain access to a vast library of movies and
            TV shows. Start your entertainment journey today!
          </p>
          <Link to="/pricing">
            <button>View Plans</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
