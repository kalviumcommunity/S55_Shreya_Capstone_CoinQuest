import React from 'react';
import HeroSection from './HeroSection';
import logo from '../assets/logo_coint.png';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="CoinQuest Logo" />
        </div>
        <div className="nav-buttons">
          <a href="/dashboard">Dashboard</a>
          <a href="#about">About Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Us */}
      <div id="about" className="about-section">
        <h2>About CoinQuest</h2>
        <div className="about-cards">
          <div className="about-card">
            <h3>💡 Our Mission</h3>
            <p>
              At CoinQuest, our mission is to simplify the way you manage your finances.
              We believe that personal budgeting shouldn’t be overwhelming or time-consuming.
              Tracking your money helps you build habits, reduce financial stress, and make informed decisions about your future.
            </p>
          </div>
          <div className="about-card">
            <h3>👩‍💻 The Developer</h3>
            <p>
              I’m Shreya Pawar, a Computer Science Engineering student at MIT ADT University.
              As the sole developer of CoinQuest, I’ve built this project from the ground up to apply my technical skills in a real-world solution.
              My focus is on building clean, user-friendly applications with meaningful impact.
            </p>
          </div>
          <div className="about-card">
            <h3>📬 Get in Touch</h3>
            <p>
              Email: <a href="mailto:shreya.pawar@kalvium.community">shreya.pawar@kalvium.community</a><br />
              Instagram: @shhhreya.fr<br />
              LinkedIn: <a href="http://linkedin.com/in/shreya-pawar-43a99528b" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a><br />
              GitHub: <a href="https://github.com/shreyaa645" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
