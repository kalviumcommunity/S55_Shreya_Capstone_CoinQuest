import React from "react";
import "./Sidebar.css";

const Sidebar=()=>{

const logout=()=>{
localStorage.removeItem("token");
window.location.href="/login";
};

return(
<aside className="sidebar glass">

<div className="sidebar-logo">
CoinQuest
</div>

<ul className="sidebar-menu">
<li className="active">Dashboard</li>
<li>Budgets</li>
<li>Analytics</li>
<li>Transactions</li>
</ul>

<button
className="logout-btn"
onClick={logout}
>
Logout
</button>

</aside>
)
}

export default Sidebar;