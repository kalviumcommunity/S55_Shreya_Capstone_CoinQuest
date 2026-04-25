import React from "react";
import "./TransactionList.css";

const TransactionList=({entries})=>{

return(
<div className="txn-panel glass">

<h3>Recent Activity</h3>

<ul>
{
entries.slice(0,10).map(item=>(
<li key={item._id}>
<span>{item.title}</span>
<strong>
₹{item.amount}
</strong>
</li>
))
}
</ul>

</div>
)

}

export default TransactionList;