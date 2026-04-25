import React from "react";
import "./BudgetCard.css";

const BudgetCard=({
name,
spent
})=>{

const percent=Math.min((spent/5000)*100,100);

return(
<div className="budget-card glass">

<h3>{name}</h3>

<div className="budget-row">
<span>Spent</span>
<span>₹{spent}</span>
</div>

<div className="budget-track">
<div
className="budget-fill"
style={{
width:`${percent}%`
}}
></div>
</div>

<button className="category-add">
Add Expense
</button>

</div>
)
}

export default BudgetCard;