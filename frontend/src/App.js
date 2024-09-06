import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./components/TermsofUse/TermsofUse";
import LoginHeader from "./components/LoginNavbar/LoginHeader";
import LoginHome from "./components/LoginHome/LoginHome";
import Login from "./components/SignUp/Login";
import ViewAll from "./components/SeeAll/viewAll";
import Genere from "./components/LoginHome/Genere/Genere";
import SearchResult from "./components/LoginNavbar/SearchResult";
import MovieDetailsPage from "./components/LoginHome/Genere/MovieDetailsPage";
import GenreSearch from "./components/GenreSearch/GenreSearch";
import Settings from "./components/Settings/Settings";
import ProfileUpdate from "./components/ProfileUpdate/ProfileUpdate";
import Watchlist from "./components/Watchlist/Watchlist";
import WatchHistory from "./components/Wishlist/Wishlist";
import SignupPage from "./components/SignUp/SignUpPage";
import Wishlist from "./components/Wishlist/Wishlist";

const App = () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  const isAuthenticated = !!token;

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? <LoginHeader /> : <Header />}
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Pricing />} />
            <Route
              path="/signin"
              element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/home"
              element={
                isAuthenticated ? <LoginHome /> : <Navigate to="/signin" />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/viewall" element={<ViewAll />} />
            <Route
              path="/profile-update"
              element={
                isAuthenticated ? <ProfileUpdate /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/watchlist"
              element={
                isAuthenticated ? <Watchlist /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/wishlist"
              element={
                isAuthenticated ? <Wishlist /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/genere"
              element={isAuthenticated ? <Genere /> : <Navigate to="/signin" />}
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/search-results"
              element={
                isAuthenticated ? <SearchResult /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/genre-search"
              element={
                isAuthenticated ? <GenreSearch /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/movie-details/:movieId"
              element={
                isAuthenticated ? (
                  <MovieDetailsPage />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
