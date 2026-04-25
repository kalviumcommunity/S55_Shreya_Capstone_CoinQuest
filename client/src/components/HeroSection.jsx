import React from "react";
import {Link} from "react-router-dom";

const HeroSection=()=>{

return(
<section className="hero-container">

<div className="hero-content glass">

<h1>
Level Up Your Money Game
</h1>

<p>
Track expenses, set budgets and conquer your finances.
</p>

<div style={{
display:"flex",
gap:"14px",
justifyContent:"center",
marginTop:"25px"
}}>

<Link to="/register">
<button className="register-btn">
Start Free
</button>
</Link>

<Link to="/login">
<button
style={{
padding:"12px 20px",
borderRadius:"12px"
}}
>
Login
</button>
</Link>

</div>

</div>

</section>
)

}

export default HeroSection;