import React from "react";

const SummaryCards=({
spent,
categories,
entries
})=>{

const income=Math.round(spent*1.5);
const balance=income-spent;

return(
<div className="summary-grid">

<div className="summary-card glass">
<h4>Balance</h4>
<h2>₹{balance}</h2>
</div>

<div className="summary-card glass">
<h4>Spent</h4>
<h2>₹{spent}</h2>
</div>

<div className="summary-card glass">
<h4>Transactions</h4>
<h2>{entries}</h2>
</div>

<div className="summary-card glass">
<h4>Categories</h4>
<h2>{categories}</h2>
</div>

</div>
)

}

export default SummaryCards;