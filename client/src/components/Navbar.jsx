import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar=()=>{

return(
<nav className="cq-navbar">

<div className="brand-logo">
CoinQuest
</div>

<div className="nav-links">

<a href="#about">
About
</a>

<Link to="/login">
Login
</Link>

<Link className="register-btn" to="/register">
Get Started
</Link>

</div>

</nav>
)

}

export default Navbar;