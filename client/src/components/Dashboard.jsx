import React,{useEffect,useState} from "react";
import axios from "axios";

import "./Dashboard.css";

import Sidebar from "./Sidebar";
import AddEntryModal from "./AddEntryModal";
import SummaryCards from "./SummaryCards";
import SpendingChart from "./SpendingChart";
import TransactionList from "./TransactionList";

const Dashboard=()=>{

const [categories,setCategories]=useState([]);
const [entries,setEntries]=useState([]);
const [showModal,setShowModal]=useState(false);
const [selectedCategoryId,setSelectedCategoryId]=useState(null);

const token=localStorage.getItem("token");

const fetchData=async()=>{
try{

const headers={
Authorization:`Bearer ${token}`
};

const [catRes,entryRes]=await Promise.all([
axios.get("http://localhost:3000/categories",{headers}),
axios.get("http://localhost:3000/entries",{headers})
]);

setCategories(catRes.data);
setEntries(entryRes.data);

}catch(error){
console.log(error);
}
};

useEffect(()=>{
fetchData();
},[]);

const categoryEntries=(id)=>
entries.filter(
e=>e.category===id
);

const spentByCategory=(id)=>
categoryEntries(id).reduce(
(sum,e)=>sum+Number(e.amount),
0
);

const totalSpent=
categories.reduce(
(sum,c)=>sum+spentByCategory(c._id),
0
);

const chartData=
categories.map(c=>({
name:c.name,
amount:spentByCategory(c._id)
}));

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="dashboard-page">

<div className="dashboard-header glass">

<div>
<h1>CoinQuest Dashboard</h1>
<p>
Track budgets. Control spending.
</p>
</div>

<button
className="add-btn"
onClick={()=>{
setSelectedCategoryId(null);
setShowModal(true);
}}
>
+ Add Entry
</button>

</div>


<SummaryCards
spent={totalSpent}
categories={categories.length}
entries={entries.length}
/>


<SpendingChart
data={chartData}
/>


<div className="budget-grid">

{
categories.map(cat=>{

const spent=spentByCategory(cat._id);
const percent=Math.min(
(spent/5000)*100,
100
);

return(

<div
key={cat._id}
className="budget-card glass"
>

<h3>
{cat.name}
</h3>

<div className="budget-row">
<span>Spent</span>
<span>₹{spent}</span>
</div>

<div className="progress-track">
<div
className="progress-fill"
style={{
width:`${percent}%`
}}
></div>
</div>

<ul className="txn-list">
{
categoryEntries(cat._id)
.slice(0,4)
.map(item=>(
<li key={item._id}>
<span>{item.title}</span>
<span>₹{item.amount}</span>
</li>
))
}
</ul>

<button
className="category-add"
onClick={()=>{
setSelectedCategoryId(cat._id);
setShowModal(true);
}}
>
Add Expense
</button>

</div>

)

})
}

</div>


<TransactionList
entries={entries}
/>


{
showModal && (
<AddEntryModal
categoryId={selectedCategoryId}
onClose={()=>{
setShowModal(false);
fetchData();
}}
/>
)
}

</div>

</div>

)

}

export default Dashboard;