import React from "react";
import "./KidsSection.css";
import kidsBackground from "../../../assets/kids.png";
import { Link } from "react-router-dom";
import Carousal from "../Carousal/Carousal";

const KidsSection = () => {
  // Replace with the genre ID for kids
  const kidsGenreId = 10751;

  return (
    <div className="kids">
      <h2 className="kids-heading">Kids Section</h2>
      <div
        className="kids-section"
        style={{ backgroundImage: `url(${kidsBackground})` }}
      >
        <div className="kids-content">
          <div className="kids-movie-carousel">
            <Link to="/kids-movies">
              <Carousal genre={kidsGenreId} />
              {/* Pass the kidsGenreId as the genre prop */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsSection;
