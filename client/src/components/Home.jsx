import React from 'react';
import HeroSection from './HeroSection';
import logo from '../assets/logo_coint.png';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_coint.png';
import background from '../assets/HomeBg.jpg';
import aboutUsBg from '../assets/AboutUsBg.jpg';

const Home = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Your Logo" />
                    </Link>
                </div>

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
            <div className="main-content">
                {/* First background image section */}
                <section className="background-section" style={{ backgroundImage: `url(${background})` }}>
                    <div className="content">
                        <h1>Welcome to CoinQuest!</h1>
                    </div>
                </section>

                {/* About Us section */}
                <section id="about" className="background-section" style={{ backgroundImage: `url(${aboutUsBg})` }}>
                    <div className="content">
                        <h2>Our Story</h2>
                        <p>At CoinQuest, we believe that managing your finances shouldn't be a source of stress and anxiety. We understand the challenges that come with budgeting and saving, which is why we're passionate about providing you with the tools and resources you need to take control of your financial future.</p>
                        <h2>Meet the Developer</h2>
                        <p>Hi, I'm Shreya, a first-year CSE student from MIT ADT University, powered by Kalvium. I'm the sole developer behind this project, bringing together my passion for web development to create impactful solutions. Contact me at- @shhhreya.fr</p>
                        <h2>Join Our Community</h2>
                        <p>Join thousands of others who have already discovered the benefits of using CoinQuest. Whether you're a budgeting beginner or a seasoned saver, there's something here for everyone.</p>
                        <h2>Get in Touch</h2>
                        <p>Have questions or feedback? We'd love to hear from you! Feel free to reach out to us at- shreya.pawar@kalvium.community</p>
                        <h2>Take the Next Step</h2>
                        <p>Ready to take control of your finances? Sign up for an account today and start your journey towards financial freedom with CoinQuest. Together, we can make your financial goals a reality.</p>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
