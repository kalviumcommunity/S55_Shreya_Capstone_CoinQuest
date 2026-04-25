import React from "react";
import AuthForm from "./AuthForm";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Track Your Money Smarter 💰</h1>
        <p>Manage your expenses with clarity and control.</p>

        <div className="auth-box">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;