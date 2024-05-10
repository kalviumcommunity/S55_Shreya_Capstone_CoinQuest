import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_coint'
const Home = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Your Logo" />
                    </Link>
                </div>

                <div className="nav-buttons">
                    <Link to="/dashboard" className="dashboard-button">Dashboard</Link>
                    <a href="#about" className="about-button">About Us</a>
                </div>
            </nav>

            
            <div className="background-image">
                <img src="./src/assets/HomeBg.jpg" alt="" />
            </div>

            <div id="about" className="about-section">
                <div className="about-background-image">                
                    <img src="./src/assets/AboutUsBg.jpg" alt="" />
                        <div>
                            <h1>Welcome to CoinQuest!</h1>
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
                </div>
            </div>
        </div>
    );
};

export default Home;
