import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

const Home=()=>{
return(
<div>

<Navbar/>

<HeroSection/>

<section id="about" className="about-section">
<div className="about-wrapper">

<h2 className="section-title">
Why CoinQuest?
</h2>

<p className="section-subtitle">
Personal finance tracking with modern budgeting intelligence.
</p>

<div className="about-cards">

<div className="about-card glass">
<h3>Smart Budgeting</h3>
<p>
Track categories, monitor progress and control overspending.
</p>
</div>

<div className="about-card glass">
<h3>Clean Analytics</h3>
<p>
Visual insights, spending patterns and monthly summaries.
</p>
</div>

<div className="about-card glass">
<h3>Built for Students</h3>
<p>
Simple personal finance tool designed for real everyday use.
</p>
</div>

</div>

</div>
</section>

</div>
)
}

export default Home;