import React from "react";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">CoinQuest</div>

        <div className="nav-buttons">
          <Link to="/dashboard">Dashboard</Link>
          <a href="#about">About</a>
        </div>
      </nav>

      <HeroSection />

      <div id="about" className="about-section">
        <h2>About CoinQuest</h2>

        <div className="about-cards">
          <div className="about-card">
            <h3>💡 Mission</h3>
            <p>Track expenses and manage finances easily.</p>
          </div>

          <div className="about-card">
            <h3>👩‍💻 Developer</h3>
            <p>Built by Shreya Pawar as a full-stack project.</p>
          </div>

          <div className="about-card">
            <h3>📬 Contact</h3>
            <p>Email & social links here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;